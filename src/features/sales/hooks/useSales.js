// useSales.js
// Maneja el CRUD de ventas y la lista de productos disponibles.
// Es el único hook que habla con saleService.

import { useState, useEffect } from 'react';
import {
    fetchSaleProducts,
    fetchSales,
    fetchCustomers,
    createSale as createSaleService,
} from '../services/saleService';

export function useSales() {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // ── Carga inicial ────────────────────────────────────────────────────

    useEffect(() => {
        const loadAll = async () => {
            try {
                const [products, sales, customers] = await Promise.all([
                    fetchSaleProducts(),
                    fetchSales(),
                    fetchCustomers(),
                ]);
                setProducts(products);
                setSales(sales);
                setCustomers(customers);
            } catch (err) {
                setError(err.message);
            }
        };
        loadAll();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await fetchSaleProducts();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // ── Crear venta ──────────────────────────────────────────────────────

    const createSale = async (payload) => {
        setIsLoading(true);
        setError(null);

        try {
            const newSale = await createSaleService(payload);

            // Agrega la venta nueva al inicio del historial sin refetch
            setSales((prev) => [newSale, ...prev]);

            // Recarga productos para reflejar el stock actualizado
            await loadProducts();

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products, // → ItemsSection
        sales, // → SalesTable
        customers,
        isLoading, // → botón confirmar (disabled mientras carga)
        error, // → toast de error de red
        createSale, // → handleSubmit en SalesIncomeView
    };
}
