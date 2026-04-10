// ============================================================
// utils/productFormUtils.js
// ------------------------------------------------------------
// Funciones utilitarias para inicializar el formulario
// de producto según el tipo de acción.
// ============================================================

// Decide con qué datos inicializar el formulario según la acción:
//   create → formulario vacío con el tipo de la vista actual
//   edit   → datos del producto, con materiales enriquecidos si es arreglo
//   delete → datos del producto sin cambios

export const resolveInitialProduct = (action, product, defaultType) => {
    if (action === 'create') return { type: defaultType, materials: [] };
    return { ...product, materials: [] };
};
