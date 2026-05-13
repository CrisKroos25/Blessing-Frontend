// features/inventory/hooks/useCatalog.js

import { useState, useEffect } from 'react';
import { fetchCategories, fetchUnits } from '../services/catalogService';

export function useCatalog() {
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [cats, uns] = await Promise.all([
                    fetchCategories(), // todas, el componente filtra por tipo
                    fetchUnits(),
                ]);
                setCategories(cats);
                setUnits(uns);
            } catch (err) {
                console.error('Error cargando catálogo:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { categories, units, loading };
}
