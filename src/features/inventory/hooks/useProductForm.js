// ============================================================
// hooks/useProductForm.js
// ------------------------------------------------------------
// Maneja los datos del formulario de producto.
// Funciona para CREAR (product = null) y EDITAR (product = {...})
// ============================================================

// Valores por defecto del formulario.
// INITIAL_FORM_STATE — nombres exactos del backend

import { useState, useEffect } from 'react';

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

export function useProductForm(product) {
    const [formData, setFormData] = useState({
        ...INITIAL_FORM_STATE,
        ...product,
    });

    useEffect(() => {
        if (formData.type === 'bundle') {
            setFormData((prev) => ({
                ...prev,
                category: 'Arreglos',
                unit: 'pcs',
                ...(product?.id ? {} : { stock: 1, min_stock: 0 }),
            }));
        }
    }, [formData.type]);

    // Maneja inputs
    const handleChange = (e) => {
        const { name, value, type } = e.target;

        let newValue = value;

        if (type === 'number') {
            if (value === '') {
                newValue = '';
            } else {
                newValue = Math.max(0, Number(value)); // evitar negativos
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
    };

    return {
        formData,
        handleChange,
        resetForm,
    };
}
