// useSaleForm.js
// Maneja el estado completo del formulario de nueva venta.
// El total NO vive en formData — se deriva de los items en cada render.

import { useState } from 'react';

// ── Estado inicial ──────────────────────────────────────────────────────────

const INITIAL_CUSTOMER = {
    customer_id: null,
    customer_name: '',
    telephone: '',
    nit: '',
    address: '',
    contact_method: '', // 'whatsapp' | 'tienda' | ''
    payment_method: '', // con default
    notes: '',
};

// Cada item de la venta tiene esta forma:
// {
//   itemId: number,       ← id del producto/arreglo en la BD
//   nombre: string,       ← para mostrarlo en la tabla
//   tipo: string,         ← 'producto' | 'arreglo' (informativo)
//   precioUnitario: number,
//   cantidad: number,
// }
const INITIAL_ITEMS = [];

// ── Hook ────────────────────────────────────────────────────────────────────

export function useSaleForm() {
    const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
    const [items, setItems] = useState(INITIAL_ITEMS);

    // ── Handlers del cliente ─────────────────────────────────────────────

    // Handler genérico — funciona para inputs tipo text, tel, radio
    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev, [name]: value }));
    };

    // Vincula un cliente frecuente — llena todos los campos con sus datos
    const handleSelectCustomer = (c) => {
        setCustomer((prev) => ({
            ...prev,
            customer_id: c.id,
            customer_name: c.name,
            telephone: c.telephone || '',
            nit: c.nit || '',
            address: c.address || '',
        }));
    };

    // Desvincula el cliente — vuelve a modo manual limpio
    const handleClearCustomer = () => {
        setCustomer((prev) => ({
            ...prev,
            customer_id: null,
            customer_name: '',
            telephone: '',
            nit: '',
            address: '',
        }));
    };

    // ── Handlers de items ────────────────────────────────────────────────

    // Agrega un producto/arreglo al carrito.
    // Si ya existe, solo incrementa la cantidad en 1.
    const addItem = (item) => {
        // item viene del buscador con forma: { itemId, name, type, unitPrice }
        setItems((prev) => {
            const exists = prev.find((i) => i.itemId === item.itemId);

            if (exists) {
                // Ya está en la lista → incrementamos quantity
                return prev.map((i) =>
                    i.itemId === item.itemId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i,
                );
            }

            // No existe → lo agregamos con quantity 1
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    // Cambia la cantidad de un item específico.
    // Si la cantidad llega a 0, el item se elimina automáticamente.
    const updateQuantity = (itemId, quantity) => {
        const numericQuantity = quantity === '' ? '' : Number(quantity);

        if (numericQuantity === 0 || numericQuantity === '') {
            removeItem(itemId);
            return;
        }

        setItems((prev) =>
            prev.map((i) =>
                i.itemId === itemId ? { ...i, quantity: numericQuantity } : i,
            ),
        );
    };

    // Elimina un item del carrito por su id.
    const removeItem = (itemId) => {
        setItems((prev) => prev.filter((i) => i.itemId !== itemId));
    };

    // ── Total derivado ───────────────────────────────────────────────────

    // Se recalcula en cada render automáticamente.
    // No vive en useState porque es un valor derivado de `items`.
    const total = items.reduce((sum, item) => {
        return sum + item.unitPrice * item.quantity;
    }, 0);

    // ── Reset ────────────────────────────────────────────────────────────

    const resetForm = () => {
        setCustomer(INITIAL_CUSTOMER);
        setItems(INITIAL_ITEMS);
        // total se resetea solo porque depende de items
    };

    // ── Retorno ──────────────────────────────────────────────────────────

    return {
        // Estado
        customer,
        items,
        total, // ← derivado, solo lectura

        // Handlers cliente
        handleCustomerChange,
        handleSelectCustomer,
        handleClearCustomer,

        // Handlers items
        addItem,
        updateQuantity,
        removeItem,

        // Utilidades
        resetForm,
    };
}
