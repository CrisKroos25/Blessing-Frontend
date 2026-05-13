import styles from './ViewHeader.module.css';
import { Search, X } from 'lucide-react';

export default function ViewHeader({
    title,
    subtitle,
    action,
    query,
    onSearch,
    filters,
    categories,
    setFilter,
    resetFilters,
}) {
    // Detecta si hay algún filtro activo para mostrar el botón de limpiar
    const hasActiveFilters =
        query.length > 0 ||
        filters?.category !== 'all' ||
        filters?.availability !== 'all' ||
        filters?.sort !== 'none';

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

            {filters ? (
                <div className={styles.contentOptions}>
                    <div className={styles.center}>
                        {/* ── Buscador ───────────────────────────────────── */}
                        <div className={styles.searchWrapper}>
                            <span className={styles.searchIcon}>
                                <Search size={14} />
                            </span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => onSearch(e.target.value)}
                                placeholder="Buscar producto"
                                className={styles.searchInput}
                            />
                        </div>
                        {/* ── Filtro por categoría ────────────────────────── */}

                        <select
                            className={styles.select}
                            value={filters.category}
                            onChange={(e) =>
                                setFilter('category', e.target.value)
                            }
                        >
                            <option value="all">Todas las categorías</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* ── Filtro por disponibilidad ───────────────────── */}
                        <select
                            className={styles.select}
                            value={filters.availability}
                            onChange={(e) =>
                                setFilter('availability', e.target.value)
                            }
                        >
                            <option value="all">Existencia</option>
                            <option value="active">Disponible</option>
                            <option value="low">Bajo</option>
                            <option value="inactive">No disponible</option>
                        </select>

                        {/* ── Limpiar filtros — solo si hay alguno activo ─── */}
                        {hasActiveFilters && (
                            <button
                                className={styles.resetBtn}
                                onClick={() => {
                                    resetFilters();
                                    onSearch('');
                                }}
                            >
                                <X size={14} />
                                <span>Limpiar</span>
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
