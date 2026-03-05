import { useState, useEffect } from 'react';
/**
 * Hook personalizado para gestionar productos
 * Centraliza la lógica de obtención y actualización de datos
 *
 * @returns {Object} Estado de productos y funciones para manipularlos
 */
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const { fetchProducts } =
                await import('../services/productService');
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const create = async (productData) => {
        try {
            const { createProduct } =
                await import('../services/productService');
            const newProduct = await createProduct(productData);

            // 🔥 Actualización local sin refetch
            setProducts((prev) => [...prev, newProduct]);
        } catch (err) {
            setError(err.message);
        }
    };

    const update = async (id, productData) => {
        try {
            const { updateProduct } =
                await import('../services/productService');
            const updated = await updateProduct(id, productData);

            setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        } catch (err) {
            setError(err.message);
        }
    };

    const remove = async (id) => {
        try {
            const { deleteProduct } =
                await import('../services/productService');
            await deleteProduct(id);

            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return {
        products,
        loading,
        error,
        create,
        update,
        remove,
    };
};
