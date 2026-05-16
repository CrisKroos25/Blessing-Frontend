// shared/components/ViewHeader/ViewHeader.jsx

import styles from './ViewHeader.module.css';
import { Search, X } from 'lucide-react';

export default function ViewHeader({
    title,
    subtitle,
    action,
    query,
    onSearch,
}) {
    // Si no viene onSearch, no hay buscador — independiente del valor de query
    const showSearch = onSearch !== undefined;
    const hasActiveFilters = query?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.containerOptions}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && (
                        <span className={styles.subtitle}>{subtitle}</span>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>

            <div className={styles.contentOptions}>
                {' '}
                {showSearch && (
                    <div className={styles.searchWrapper}>
                        <span className={styles.searchIcon}>
                            <Search size={14} />
                        </span>
                        <input
                            type="text"
                            value={query ?? ''}
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="Buscar"
                            className={styles.searchInput}
                        />
                    </div>
                )}
                {/* ── Limpiar filtros — solo si hay alguno activo ─── */}
                {hasActiveFilters && (
                    <button
                        className={styles.resetBtn}
                        onClick={() => {
                            onSearch('');
                        }}
                    >
                        <X size={14} />
                        <span>Limpiar</span>
                    </button>
                )}
            </div>
        </div>
    );
}
