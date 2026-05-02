// useSearch.js
// Hook genérico para filtrar una lista por nombre.
// Recibe cualquier array de objetos y el campo por el que filtrar.

import { useState, useMemo } from 'react';

export function useSearch(items = [], field = 'name') {
    const [query, setQuery] = useState('');

    // useMemo evita recalcular el filtro en cada render —
    // solo se recalcula cuando items o query cambian
    const filtered = useMemo(
        () =>
            items.filter((item) =>
                item[field]?.toLowerCase().includes(query.toLowerCase()),
            ),
        [items, query, field],
    );

    return {
        query,
        setQuery,
        filtered, // ← la lista ya filtrada para pasar a MaterialsTable
    };
}
