// ItemsSection.jsx
// Sección 2 del formulario de venta: búsqueda y selección de productos.
// El usuario busca y hace click en una card para agregar el item al carrito.

import { Search, ImageOff, X, PackageOpen, CircleAlert } from 'lucide-react';
import styles from './ItemsSection.module.css';

// ── Helpers ──────────────────────────────────────────────────────────────────

// Decide el badge de stock según la cantidad disponible
function getStockInfo(stock, stockMinimum) {
    if (stock === 0) return { label: 'Agotado', className: styles.stockOut };
    if (stock < stockMinimum)
        return { label: 'Stock bajo', className: styles.stockLow };
    return { label: 'Disponible', className: styles.stockOk };
}

// Formatea precio en quetzales
function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

// ── Componente ───────────────────────────────────────────────────────────────

export default function ItemsSection({
    products = [],
    onAdd,
    error,
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
        filters?.availability !== 'all';

    // Filtramos localmente por name (los datos aún contienen labels en español)
    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
    );

    const BUNDLE_TYPES = ['arreglo', 'bundle'];

    const bundles = filtered.filter((p) => BUNDLE_TYPES.includes(p.type));
    const regulars = filtered.filter((p) => !BUNDLE_TYPES.includes(p.type));

    // Helper para mantener tu código de las cards limpio y no repetirlo en ambas listas
    const renderCard = (product) => {
        const { label, className } = getStockInfo(
            product.stock,
            product.min_stock,
        );
        const outOfStock = product.stock === 0;

        return (
            <div
                key={product.id}
                className={styles.productCard}
                onClick={() =>
                    !outOfStock &&
                    onAdd({
                        itemId: product.id,
                        name: product.name,
                        type: product.type,
                        unitPrice: product.sell_price,
                    })
                }
                style={
                    outOfStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}
                }
            >
                <div className={styles.imageWrapper}>
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.productImage}
                        />
                    ) : (
                        <ImageOff
                            size={36}
                            className={styles.placeholderIcon}
                        />
                    )}
                </div>
                <div className={styles.productInfo}>
                    <p className={styles.productName} title={product.name}>
                        {product.name}
                    </p>
                    <div className={styles.productMeta}>
                        <span className={styles.productPrice}>
                            {formatPrice(product.sell_price)}
                        </span>
                        <span className={`${styles.stockBadge} ${className}`}>
                            {label}: {product.stock}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.section}>
            {/* ── Header ───────────────────────────────────────────────── */}
            <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>2</span>
                <h2 className={styles.sectionTitle}>Productos</h2>
            </div>

            <div className={styles.contentOptions}>
                {/* ── Buscador ─────────────────────────────────────────────── */}
                <div className={styles.searchWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Buscar productos..."
                        className={styles.searchInput}
                    />
                </div>
                <select
                    className={styles.select}
                    value={filters.category}
                    onChange={(e) => setFilter('category', e.target.value)}
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
                    onChange={(e) => setFilter('availability', e.target.value)}
                >
                    <option value="all">Existencia</option>
                    <option value="active">Disponible</option>
                    <option value="low">Stock Bajo</option>
                    <option value="inactive">Agotado</option>
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
            {/* Error si el usuario intentó confirmar sin agregar nada */}
            {error && (
                <span className={styles.errorText}>
                    {<CircleAlert size={12} />} {error}
                </span>
            )}
            {/* ── Carruseles de productos ───────────────────────────────── */}
            <div className={styles.carouselWrapper}>
                {filtered.length === 0 ? (
                    <div className={styles.containerEmpty}>
                        <PackageOpen size={30} />
                        <span>No existen productos registrados.</span>
                    </div>
                ) : (
                    <>
                        {bundles.length > 0 && (
                            <div className={styles.categoryGroup}>
                                <h3 className={styles.categoryTitle}>
                                    Arreglos (Bundles)
                                </h3>
                                <div className={styles.carousel}>
                                    {bundles.map(renderCard)}
                                </div>
                            </div>
                        )}

                        {regulars.length > 0 && (
                            <div className={styles.categoryGroup}>
                                <h3 className={styles.categoryTitle}>
                                    Productos Individuales
                                </h3>
                                <div className={styles.carousel}>
                                    {regulars.map(renderCard)}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
