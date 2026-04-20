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

    // Sincroniza silenciosamente el inventario para reflejar deducciones de stock de materiales
    const reloadSilently = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            console.error('Error re-sincronizando inventario:', err);
        }
    };

    // Errores de creación/edición/eliminación van SOLO al modal via throw,
    // no se tocan el estado global de error para no bloquear la página.
    const create = async (productData) => {
        try {
            const newProduct = await createProduct(productData);
            setProducts((prev) => [...prev, newProduct]);
            reloadSilently();
        } catch (err) {
            throw err;
        }
    };

    const update = async (id, productData) => {
        try {
            const updated = await updateProduct(id, productData);
            setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
            reloadSilently();
        } catch (err) {
            throw err;
        }
    };

    const remove = async (id) => {
        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            reloadSilently();
        } catch (err) {
            throw err;
        }
    };

    // Carga inicial de productos desde el servidor.
    // Solo este método modifica el estado global de error.
    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProducts();
            setProducts(data);
            setError(null); // Limpiar error si la carga fue exitosa
        } catch (err) {
            setError(err.message); // ← InventoryPage muestra este error
        } finally {
            setLoading(false);
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
