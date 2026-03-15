// ============================================================
// hooks/useProductForm.js
// ------------------------------------------------------------
// Maneja los datos del formulario de producto.
// Funciona para CREAR (product = null) y EDITAR (product = {...})
// ============================================================

import { useState } from 'react';

// Valores por defecto del formulario.
// Los definimos FUERA del hook para que no se recreen
// en cada render. Si necesitas agregar un campo nuevo
// al formulario, solo lo agregas aquí.
const INITIAL_FORM_STATE = {
    image: '',
    name: '',
    description: '',
    category: '',
    type: '', // // 'raw' | 'final'  ← consistente con GeneralInfoSection
    stock: '',
    stockMin: '',
    unit: '', // ← nuevo
    materialType: '', // ← nuevo
    purchasePrice: '',
    salePrice: '',
};

export function useProductForm(product) {
    // Si recibimos un producto, lo usamos como estado inicial.
    // Si no (modo creación), usamos el formulario vacío.
    // Esto reemplaza el useEffect anterior — es más simple y predecible
    // porque el estado se define UNA sola vez al montar el componente.
    const [formData, setFormData] = useState(product ?? INITIAL_FORM_STATE);

    // Maneja cambios en inputs y selects normales:
    // <input name="price" onChange={handleChange} />
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    // Resetea el formulario a su estado inicial.
    // Útil para limpiar después de guardar o al cancelar.
    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    return {
        formData,
        handleChange,
        resetForm,
    };
}
