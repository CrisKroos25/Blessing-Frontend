import { useState } from 'react';
import { Search, ImageOff } from 'lucide-react';
import styles from './PurchaseItemsSection.module.css';

function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

export default function PurchaseItemsSection({ items = [], onAdd, error }) {
    const [query, setQuery] = useState('');

    const filtered = items.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>2</span>
                <h2 className={styles.sectionTitle}>Productos</h2>
            </div>

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

            {error && <span className={styles.errorText}>⚠ {error}</span>}

            <div className={styles.carousel}>
                {filtered.length === 0 ? (
                    <p className={styles.emptySearch}>
                        No se encontraron ítems con "{query}"
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
