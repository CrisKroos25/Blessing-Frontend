// ============================================================
// useProducts.js
// ------------------------------------------------------------
// Hook central del módulo de inventario.
// Gestiona el estado de los productos y expone las funciones
// CRUD que los componentes necesitan.
//
// Patrón "optimistic update": después de cada operación,
// actualizamos el estado LOCAL sin volver a pedirle todos
// los datos al servidor — la UI responde de forma instantánea.
// ============================================================

import { useState, useEffect } from 'react';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Carga inicial — trae todos los productos del servicio
    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            // finally se ejecuta siempre, con éxito o con error
            // así loading nunca queda pegado en true
            setLoading(false);
        }
    };

    const create = async (productData) => {
        try {
            const newProduct = await createProduct(productData);

            // Agregamos el nuevo producto al final del array local
            // sin necesidad de volver a llamar loadProducts()
            setProducts((prev) => [...prev, newProduct]);
        } catch (err) {
            setError(err.message);
        }
    };

    const update = async (id, productData) => {
        try {
            const updated = await updateProduct(id, productData);

            // Recorremos el array y reemplazamos solo el producto
            // que cambió, dejando todos los demás intactos
            setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        } catch (err) {
            setError(err.message);
        }
    };

    const remove = async (id) => {
        try {
            await deleteProduct(id);

            // Filtramos el producto eliminado fuera del array local
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    // Se ejecuta una sola vez al montar el componente que use este hook
    // El array vacío [] significa "no hay dependencias que lo re-ejecuten"
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
