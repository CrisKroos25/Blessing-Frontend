// features/sales/components/SalesHeadTitle/SalesHeadTitle.jsx

import styles from './SalesHeadTitle.module.css';
import { Search, X } from 'lucide-react';

import DateRangePicker from '@features/sales/components/DateRangePicker/DateRangePicker';

const PAYMENT_OPTIONS = [
    { value: 'all', label: 'Método de pago' },
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'transferencia', label: 'Transferencia' },
    { value: 'tarjeta', label: 'Tarjeta' },
];

export default function SalesHeadTitle({
    title,
    subtitle,
    action,
    // Todo lo siguiente es opcional
    query,
    onSearch,
    filters,
    setFilter,
    resetFilters,
}) {
    const hasActiveFilters =
        query?.length > 0 ||
        (filters?.payment_method && filters.payment_method !== 'all') ||
        filters?.date_from !== '' ||
        filters?.date_to !== '';

    // Muestra controles solo si vienen las props necesarias
    const showSearch = onSearch !== undefined;
    const showFilters = filters !== undefined;

    return (
        <div className={styles.container}>
            {/* ── Título + acción ── */}
            <div className={styles.containerOptions}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && (
                        <span className={styles.subtitle}>{subtitle}</span>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>

            {/* ── Controles — solo si hay buscador o filtros ── */}
            {(showSearch || showFilters) && (
                <div className={styles.contentOptions}>
                    <div className={styles.center}>
                        {/* Buscador — opcional */}
                        {showSearch && (
                            <div className={styles.searchWrapper}>
                                <span className={styles.searchIcon}>
                                    <Search size={14} />
                                </span>
                                <input
                                    type="text"
                                    value={query ?? ''}
                                    onChange={(e) => onSearch(e.target.value)}
                                    placeholder="Buscar cliente"
                                    className={styles.searchInput}
                                />
                            </div>
                        )}

                        {/* Filtros — opcionales */}
                        {showFilters && (
                            <>
                                <select
                                    className={styles.select}
                                    value={filters.payment_method}
                                    onChange={(e) =>
                                        setFilter(
                                            'payment_method',
                                            e.target.value,
                                        )
                                    }
                                >
                                    {PAYMENT_OPTIONS.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>

                                <DateRangePicker
                                    dateFrom={filters.date_from}
                                    dateTo={filters.date_to}
                                    onChange={({ date_from, date_to }) => {
                                        setFilter('date_from', date_from);
                                        setFilter('date_to', date_to);
                                    }}
                                />
                            </>
                        )}

                        {/* Limpiar — solo si hay algo activo */}
                        {hasActiveFilters && (
                            <button
                                className={styles.resetBtn}
                                onClick={() => {
                                    resetFilters?.();
                                    onSearch?.('');
                                }}
                            >
                                <X size={14} />
                                <span>Limpiar</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
