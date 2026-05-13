import { useState, useMemo } from 'react';
import { Search, ImageOff, X } from 'lucide-react';
import styles from './PurchaseItemsSection.module.css';

const TYPE_LABELS = {
    product: 'Controlado',
    supply: 'Insumo',
};

function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

export default function PurchaseItemsSection({ items = [], onAdd, error }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [type, setType] = useState('all');

    // Los bundles no se compran — los excluimos siempre
    const purchasableItems = useMemo(
        () => items.filter((i) => i.type !== 'bundle'),
        [items],
    );

    // Categorías únicas derivadas de los items comprables
    const categories = useMemo(() => {
        const unique = [
            ...new Set(purchasableItems.map((i) => i.category).filter(Boolean)),
        ];
        return unique.sort();
    }, [purchasableItems]);

    const hasActiveFilters = query.length > 0 || category !== 'all' || type !== 'all';

    const resetFilters = () => {
        setQuery('');
        setCategory('all');
        setType('all');
    };

    const filtered = useMemo(() => {
        return purchasableItems.filter((i) => {
            const matchesQuery = i.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = category === 'all' || i.category === category;
            const matchesType = type === 'all' || i.type === type;
            return matchesQuery && matchesCategory && matchesType;
        });
    }, [purchasableItems, query, category, type]);

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>2</span>
                <h2 className={styles.sectionTitle}>Productos</h2>
            </div>

            <div className={styles.contentOptions}>
                <div className={styles.searchWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar ítems..."
                        className={styles.searchInput}
                    />
                </div>

                <select
                    className={styles.select}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">Todas las categorías</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    className={styles.select}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="all">Todos los tipos</option>
                    {Object.entries(TYPE_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                    ))}
                </select>

                {hasActiveFilters && (
                    <button className={styles.resetBtn} onClick={resetFilters}>
                        <X size={14} />
                        <span>Limpiar</span>
                    </button>
                )}

                {error && <span className={styles.errorText}>⚠ {error}</span>}
            </div>

            <div className={styles.carousel}>
                {filtered.length === 0 ? (
                    <p className={styles.emptySearch}>
                        No se encontraron ítems
                        {query ? ` con "${query}"` : ''}
                        {category !== 'all' ? ` en ${category}` : ''}
                        {type !== 'all' ? ` de tipo ${TYPE_LABELS[type]}` : ''}
                    </p>
                ) : (
                    filtered.map((item) => (
                        <div
                            key={item.id}
                            className={styles.itemCard}
                            onClick={() => onAdd(item)}
                        >
                            <div className={styles.imageWrapper}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                ) : (
                                    <ImageOff size={32} className={styles.placeholderIcon} />
                                )}
                            </div>
                            <div className={styles.itemInfo}>
                                <p className={styles.itemName} title={item.name}>{item.name}</p>
                                <div className={styles.itemMeta}>
                                    <span className={styles.itemPrice}>
                                        {formatPrice(item.purchase_price)}
                                    </span>
                                    <span className={styles.itemStock}>
                                        {item.stock} {item.unit}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
