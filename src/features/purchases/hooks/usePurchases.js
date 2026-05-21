import { useState, useEffect } from 'react';
import {
    fetchPurchaseItems,
    fetchPurchases,
    createPurchase as createPurchaseService,
} from '../services/purchaseService';

export function usePurchases() {
    const [purchases, setPurchases] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadItems = async () => {
        try {
            const data = await fetchPurchaseItems();
            setItems(Array.isArray(data) ? data : (data?.results ?? []));
        }
        catch (err) { console.error('Error cargando items:', err); }
    };

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            const [purchasesData, itemsData] = await Promise.all([
                fetchPurchases(),
                fetchPurchaseItems(),
            ]);
            setPurchases(Array.isArray(purchasesData) ? purchasesData : (purchasesData?.results ?? []));
            setItems(Array.isArray(itemsData) ? itemsData : (itemsData?.results ?? []));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const createPurchase = async (payload) => {
        setIsLoading(true);
        setError(null);
        try {
            const newPurchase = await createPurchaseService(payload);
            setPurchases((prev) => [newPurchase, ...prev]);
            await loadItems();
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        purchases, items,
        isLoading, error,
        createPurchase,
    };
}
