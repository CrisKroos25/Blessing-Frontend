// Función pura: recibe un producto y devuelve su status calculado.
// "Pura" significa que no modifica nada, solo calcula y devuelve.

export const getProductStatus = (product) => {
    if (product.stock === 0) return 'inactive'; // Agotado
    if (product.stock < product.min_stock) return 'low'; // Stock bajo
    return 'active'; // Disponible
};
