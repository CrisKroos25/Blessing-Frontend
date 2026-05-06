import { useState, useEffect } from 'react';
import {
    fetchPurchaseItems,
    fetchSuppliers,
    fetchPlaces,
    fetchPurchases,
    createPurchase as createPurchaseService,
    createSupplier as createSupplierService,
    updateSupplier as updateSupplierService,
    deactivateSupplier as deactivateSupplierService,
    createPlace as createPlaceService,
    updatePlace as updatePlaceService,
    deactivatePlace as deactivatePlaceService,
} from '../services/purchaseService';

export function usePurchases() {
    const [purchases, setPurchases] = useState([]);
    const [items, setItems]         = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [places, setPlaces]       = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState(null);

    useEffect(() => {
        loadItems();
        loadSuppliers();
        loadPlaces();
        loadPurchases();
    }, []);

    const loadItems = async () => {
        try { setItems(await fetchPurchaseItems()); }
        catch (err) { setError(err.message); }
    };

    const loadSuppliers = async () => {
        try { setSuppliers(await fetchSuppliers()); }
        catch (err) { setError(err.message); }
    };

    const loadPlaces = async () => {
        try { setPlaces(await fetchPlaces()); }
        catch (err) { setError(err.message); }
    };

    const loadPurchases = async () => {
        try { setPurchases(await fetchPurchases()); }
        catch (err) { setError(err.message); }
    };

    // ── Compras ──────────────────────────────────────────────
    const createPurchase = async (payload) => {
        setIsLoading(true);
        setError(null);
        try {
            const newPurchase = await createPurchaseService(payload);
            setPurchases((prev) => [newPurchase, ...prev]);
            await loadItems(); // refresca stock
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    // ── Proveedores ──────────────────────────────────────────
    const createSupplier = async (payload) => {
        setIsLoading(true);
        try {
            const s = await createSupplierService(payload);
            setSuppliers((prev) => [...prev, s]);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const updateSupplier = async (id, payload) => {
        setIsLoading(true);
        try {
            const updated = await updateSupplierService(id, payload);
            setSuppliers((prev) => prev.map((s) => s.id === id ? updated : s));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const deactivateSupplier = async (id) => {
        setIsLoading(true);
        try {
            await deactivateSupplierService(id);
            setSuppliers((prev) => prev.map((s) => s.id === id ? { ...s, is_active: false } : s));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    // ── Lugares ──────────────────────────────────────────────
    const createPlace = async (payload) => {
        setIsLoading(true);
        try {
            const p = await createPlaceService(payload);
            setPlaces((prev) => [...prev, p]);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const updatePlace = async (id, payload) => {
        setIsLoading(true);
        try {
            const updated = await updatePlaceService(id, payload);
            setPlaces((prev) => prev.map((p) => p.id === id ? updated : p));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const deactivatePlace = async (id) => {
        setIsLoading(true);
        try {
            await deactivatePlaceService(id);
            setPlaces((prev) => prev.map((p) => p.id === id ? { ...p, is_active: false } : p));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    return {
        purchases, items, suppliers, places,
        isLoading, error,
        createPurchase,
        createSupplier, updateSupplier, deactivateSupplier,
        createPlace, updatePlace, deactivatePlace,
    };
}
