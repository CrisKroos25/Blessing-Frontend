// useTableFilters.js
// Filtra y ordena una lista de productos según categoría,
// disponibilidad y orden alfabético por nombre.
// Recibe la lista ya filtrada por useSearch.

import { useState, useMemo } from 'react';

const INITIAL_FILTERS = {
    category: 'all', // 'all' | cualquier categoría existente
    availability: 'all', // 'all' | 'active' | 'inactive'
    sort: 'none', // 'none' | 'asc' | 'desc'
};

export function useTableFilters(items = []) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    // Setter individual — actualiza un solo filtro sin pisar los demás
    // Uso: setFilter('category', 'Peluches')
    const setFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => setFilters(INITIAL_FILTERS);

    // Categorías únicas derivadas de la lista — se recalculan si items cambia
    const categories = useMemo(() => {
        const unique = [
            ...new Set(items.map((p) => p.category).filter(Boolean)),
        ];
        return unique.sort(); // alfabético para el dropdown
    }, [items]);

    // Lista final con filtros y orden aplicados
    const result = useMemo(() => {
        let list = [...items];

        // ── Filtro por categoría ─────────────────────────────────────
        if (filters.category !== 'all') {
            list = list.filter((p) => p.category === filters.category);
        }

        // ── Filtro por disponibilidad (is_activate) ──────────────────
        if (filters.availability === 'active') {
            list = list.filter((p) => p.stock >= p.min_stock);
        } else if (filters.availability === 'inactive') {
            list = list.filter((p) => p.stock === 0);
        } else if (filters.availability === 'low') {
            list = list.filter((p) => p.stock < p.min_stock && p.stock != 0);
        }

        return list;
    }, [items, filters]);

    return {
        result, // → MaterialsTable
        filters, // → controles de filtro (para marcar el activo)
        categories, // → dropdown de categorías
        setFilter, // → cada control llama setFilter('key', 'value')
        resetFilters, // → botón limpiar filtros
    };
}
