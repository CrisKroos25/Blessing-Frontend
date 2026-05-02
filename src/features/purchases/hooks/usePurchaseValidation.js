import { useState } from 'react';

export function usePurchaseValidation() {
    const [errors, setErrors] = useState({ meta: {}, details: null });

    const validate = ({ meta, details }) => {
        const metaErrors = {};

        if (!meta.supplier_id && !meta.place_id) {
            metaErrors.origin = 'Selecciona un proveedor o un lugar de compra';
        }
        if (!meta.date) {
            metaErrors.date = 'La fecha es requerida';
        }

        const detailsError = details.length === 0
            ? 'Agrega al menos un producto a la compra'
            : null;

        const newErrors = { meta: metaErrors, details: detailsError };
        setErrors(newErrors);

        return Object.keys(metaErrors).length === 0 && detailsError === null;
    };

    const resetErrors = () => setErrors({ meta: {}, details: null });

    return { errors, validate, resetErrors };
}
