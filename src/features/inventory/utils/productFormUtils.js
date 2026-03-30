// ============================================================
// utils/productFormUtils.js
// ------------------------------------------------------------
// Funciones utilitarias para inicializar el formulario
// de producto según el tipo de acción.
// ============================================================

// Agrega el nombre legible a cada material del arreglo
// buscándolo en la lista completa de productos por su id
export const enrichMaterials = (product, allProducts) => {
    const resolvedMaterials = product.materials.map((material) => {
        const found = allProducts.find((p) => p.id === material.productId);
        return {
            ...material,
            name: found?.name ?? 'Producto no encontrado',
        };
    });
    return { ...product, materials: resolvedMaterials };
};

// Decide con qué datos inicializar el formulario según la acción:
//   create → formulario vacío con el tipo de la vista actual
//   edit   → datos del producto, con materiales enriquecidos si es arreglo
//   delete → datos del producto sin cambios
export const resolveInitialProduct = (
    action,
    product,
    defaultType,
    allProducts,
) => {
    if (action === 'create') return { type: defaultType, materials: [] };
    if (action === 'edit' && product.materials?.length > 0)
        return enrichMaterials(product, allProducts);
    return product;
};
