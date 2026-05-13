// features/sales/hooks/useSaleFilters.js

import { useState, useMemo } from 'react';

const INITIAL_FILTERS = {
    payment_method: 'all', // 'all' | 'efectivo' | 'transferencia' | 'tarjeta'
    date_from: '', // 'YYYY-MM-DD' | ''
    date_to: '', // 'YYYY-MM-DD' | ''
};

export function useSaleFilters(items = []) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const setFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => setFilters(INITIAL_FILTERS);

    const result = useMemo(() => {
        let list = [...items];

        // ── Filtro por método de pago ────────────────────────────────
        if (filters.payment_method !== 'all') {
            list = list.filter(
                (s) => s.payment_method === filters.payment_method,
            );
        }

        // ── Filtro por rango de fechas ───────────────────────────────
        if (filters.date_from) {
            const from = new Date(filters.date_from + 'T00:00:00'); // ← medianoche local
            list = list.filter((s) => new Date(s.created_at) >= from);
        }

        if (filters.date_to) {
            const to = new Date(filters.date_to + 'T23:59:59'); // ← fin del día local
            list = list.filter((s) => new Date(s.created_at) <= to);
        }

        return list;
    }, [items, filters]);

    return {
        result,
        filters,
        setFilter,
        resetFilters,
    };
}
