// ============================================================
// useBundleMaterials.js
// ------------------------------------------------------------
// Hook personalizado para cargar materiales de un bundle
// cuando se edita un producto de tipo 'bundle'.
// ============================================================

import { useEffect } from 'react';
import { fetchBundleMaterials } from '../services/productService';

export function useBundleMaterials(action, product, handleChange) {
    useEffect(() => {
        const loadMaterials = async () => {
            if (action === 'edit' && product?.type === 'bundle') {
                try {
                    const materials = await fetchBundleMaterials(product.id);
                    handleChange({
                        target: { name: 'materials', value: materials },
                    });
                } catch {
                    console.error('Error loading materials');
                }
            }
        };
        loadMaterials();
    }, [action, product, handleChange]);
}
