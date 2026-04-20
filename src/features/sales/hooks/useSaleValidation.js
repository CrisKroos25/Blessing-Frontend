// useSaleValidation.js
// Valida el formulario de venta al momento de confirmar (submit).
// Recibe el estado completo del hook useSaleForm y devuelve los errores.

import { useState } from 'react';

// ── Reglas de validación ────────────────────────────────────────────────────

// Cada función recibe el valor y retorna un string con el error, o null si está bien.
const CUSTOMER_RULES = {
    customer_name: (value) => {
        if (!value.trim()) return 'El nombre es requerido';
        if (value.trim().length < 2) return 'El nombre es muy corto';
        return null;
    },
    telephone: (value) => {
        if (!value.trim()) return 'El teléfono es requerido';
        // Acepta formatos guatemaltecos: 5555-1234 o 55551234
        const soloNumeros = value.replace(/[-\s]/g, '');
        if (soloNumeros.length < 8)
            return 'El teléfono debe tener al menos 8 dígitos';
        return null;
    },
};

// ── Hook ────────────────────────────────────────────────────────────────────

export function useSaleValidation() {
    // errors tiene la misma forma que los campos:
    // { customer: { customer_name: 'mensaje', telephone: 'mensaje' }, items: 'mensaje' }
    const [errors, setErrors] = useState({
        customer: {},
        items: null,
    });

    // ── Validar todo el formulario ───────────────────────────────────────

    // Recibe el estado de useSaleForm y retorna true si todo está bien.
    // Se llama solo al hacer submit.
    const validate = ({ customer, items }) => {
        const customerErrors = {};

        // Recorremos solo los campos que tienen regla definida (customer_name, telephone)
        // Los opcionales (nit, address, contact_method) no se validan
        Object.entries(CUSTOMER_RULES).forEach(([campo, regla]) => {
            const error = regla(customer[campo]);
            if (error) customerErrors[campo] = error;
        });

        // Validación de items: debe haber al menos uno para poder confirmar
        const itemsError =
            items.length === 0
                ? 'Agrega al menos un producto a la venta'
                : null;

        const nuevosErrors = {
            customer: customerErrors,
            items: itemsError,
        };

        setErrors(nuevosErrors);

        // Devuelve true (sin errores) o false (con al menos un error)
        const sinErroresCliente = Object.keys(customerErrors).length === 0;
        const sinErroresItems = itemsError === null;
        return sinErroresCliente && sinErroresItems;
    };

    // ── Limpiar errores ──────────────────────────────────────────────────

    // Se llama desde resetForm para limpiar la pantalla tras confirmar la venta
    const resetErrors = () => {
        setErrors({ customer: {}, items: null });
    };

    return {
        errors, // ← se pasa a ClientSection e ItemsSection
        validate, // ← se llama en el handler de submit
        resetErrors, // ← se llama junto a resetForm
    };
}
