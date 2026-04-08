// ============================================================
// hooks/useProductForm.js
// ------------------------------------------------------------
// Maneja los datos del formulario de producto.
// Funciona para CREAR (product = null) y EDITAR (product = {...})
// ============================================================

import { useState } from 'react';

// Valores por defecto del formulario.
// INITIAL_FORM_STATE — nombres exactos del backend
const INITIAL_FORM_STATE = {
    image: '',
    name: '',
    description: '',
    category: '',
    type: '', // 'product' | 'supply' | 'bundle'
    stock: '',
    min_stock: '',
    unit: '',
    purchase_price: '',
    sell_price: '',
    materials: [],
};

// Mezclamos INITIAL_FORM_STATE con lo que venga del producto si viene vacio usamos el formulario vacío.
export function useProductForm(product) {
    const [formData, setFormData] = useState({
        ...INITIAL_FORM_STATE,
        ...product,
    });

    // Maneja cambios en inputs y selects normales: <input name="price" onChange={handleChange} />
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    // Resetea el formulario a su estado inicial.
    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    return {
        formData,
        handleChange,
        resetForm,
    };
}
