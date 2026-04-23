import { useState } from 'react';

// REQUIRED_FIELDS — mismos nombres
const REQUIRED_FIELDS = {
    name: 'Nombre de producto',
    category: 'Categoría',
    type: 'Tipo de producto',
    stock: 'Stock actual',
    min_stock: 'Stock mínimo',
    unit: 'Unidad de medida',
    sell_price: 'Precio de venta',
    purchase_price: 'Precio de compra',
};

export function useProductValidation() {
    const [errors, setErrors] = useState({});

    const validate = (formData) => {
        const newErrors = {};
        console.log('Validando formData.type:', formData.type);
        console.log('Validando formData.materials:', formData.materials);

        Object.entries(REQUIRED_FIELDS).forEach(([field, label]) => {
            if (!formData[field] && formData[field] !== 0) {
                newErrors[field] = `${label} es requerido`;
            }
        });

        // Validaciones específicas para bundles (arreglos):
        // - Debe tener al menos un material/componente
        // - Cada material debe tener cantidad > 0
        if (formData.type === 'bundle') {
            if (!formData.materials?.length) {
                newErrors.materials =
                    'Un arreglo debe tener al menos un producto o insumo';
            } else {
                const invalidMaterial = formData.materials.some(
                    (material) =>
                        material.quantity == null ||
                        Number(material.quantity) <= 0,
                );

                if (invalidMaterial) {
                    newErrors.materials =
                        'Cada material debe tener cantidad mayor que cero';
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true (sin errores) o false (con al menos un error)
    };

    const clearErrors = () => setErrors({});

    return { errors, validate, clearErrors };
}
