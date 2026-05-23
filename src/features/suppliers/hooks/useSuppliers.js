import { useState, useEffect } from 'react';
import {
    fetchSuppliers,
    fetchPlaces,
    createSupplier as createSupplierService,
    updateSupplier as updateSupplierService,
    deactivateSupplier as deactivateSupplierService,
    reactivateSupplier as reactivateSupplierService,
    deleteSupplier as deleteSupplierService,
    createPlace as createPlaceService,
    updatePlace as updatePlaceService,
    deactivatePlace as deactivatePlaceService,
    reactivatePlace as reactivatePlaceService,
    deletePlace as deletePlaceService,
} from '../services/supplierService';

export function useSuppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [places, setPlaces]       = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState(null);

    useEffect(() => {
        loadSuppliers();
        loadPlaces();
    }, []);

    const loadSuppliers = async () => {
        try {
            const data = await fetchSuppliers();
            setSuppliers(Array.isArray(data) ? data : (data?.results ?? []));
        }
        catch (err) { setError(err.message); }
    };

    const loadPlaces = async () => {
        try {
            const data = await fetchPlaces();
            setPlaces(Array.isArray(data) ? data : (data?.results ?? []));
        }
        catch (err) { setError(err.message); }
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
            const updated = await deactivateSupplierService(id);
            setSuppliers((prev) => prev.map((s) => s.id === id ? updated : s));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const reactivateSupplier = async (id) => {
        setIsLoading(true);
        try {
            const updated = await reactivateSupplierService(id);
            setSuppliers((prev) => prev.map((s) => s.id === id ? updated : s));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const deleteSupplier = async (id) => {
        setIsLoading(true);
        try {
            await deleteSupplierService(id);
            setSuppliers((prev) => prev.filter((s) => s.id !== id));
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
            const updated = await deactivatePlaceService(id);
            setPlaces((prev) => prev.map((p) => p.id === id ? updated : p));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const reactivatePlace = async (id) => {
        setIsLoading(true);
        try {
            const updated = await reactivatePlaceService(id);
            setPlaces((prev) => prev.map((p) => p.id === id ? updated : p));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    const deletePlace = async (id) => {
        setIsLoading(true);
        try {
            await deletePlaceService(id);
            setPlaces((prev) => prev.filter((p) => p.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        } finally { setIsLoading(false); }
    };

    return {
        suppliers, places,
        isLoading, error,
        createSupplier, updateSupplier, deactivateSupplier, reactivateSupplier, deleteSupplier,
        createPlace, updatePlace, deactivatePlace, reactivatePlace, deletePlace,
    };
}
