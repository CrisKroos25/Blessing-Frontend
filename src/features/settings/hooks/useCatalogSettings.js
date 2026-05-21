// features/settings/hooks/useCatalogSettings.js

import { useState, useEffect } from 'react';
import {
    fetchCategories,
    createCategory,
    deleteCategory,
    fetchUnits,
    createUnit,
    deleteUnit,
} from '../services/catalogService';

export function useCatalogSettings() {
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [cats, uns] = await Promise.all([
                    fetchCategories(),
                    fetchUnits(),
                ]);
                setCategories(Array.isArray(cats) ? cats : (cats?.results ?? []));
                setUnits(Array.isArray(uns) ? uns : (uns?.results ?? []));
            } catch (err) {
                console.error('Error cargando catálogo:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // ── Categorías ───────────────────────────────────────────────────────

    const addCategory = async (name, item_type) => {
        const created = await createCategory(name, item_type);
        setCategories((prev) => [...prev, created]);
    };

    const removeCategory = async (id) => {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    // ── Unidades ─────────────────────────────────────────────────────────

    const addUnit = async (name) => {
        const created = await createUnit(name);
        setUnits((prev) => [...prev, created]);
    };

    const removeUnit = async (id) => {
        await deleteUnit(id);
        setUnits((prev) => prev.filter((u) => u.id !== id));
    };

    return {
        categories,
        units,
        loading,
        addCategory,
        removeCategory,
        addUnit,
        removeUnit,
    };
}
