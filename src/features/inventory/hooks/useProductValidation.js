import { useState } from 'react';

const REQUIRED_FIELDS = {
    name: 'Nombre de producto',
    category: 'Categoría',
    type: 'Tipo de producto',
    stock: 'Stock actual',
    stockMin: 'Stock mínimo',
    unit: 'Unidad de medida',
    purchasePrice: 'Precio de compra',
};

export function useProductValidation() {
    const [errors, setErrors] = useState({});

    const validate = (formData) => {
        const newErrors = {};

        Object.entries(REQUIRED_FIELDS).forEach(([field, label]) => {
            if (!formData[field] && formData[field] !== 0) {
                newErrors[field] = `${label} es requerido`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true (sin errores) o false (con al menos un error)
    };

    const clearErrors = () => setErrors({});

    return { errors, validate, clearErrors };
}
