// ProductCard.jsx
// Card reutilizable para mostrar un producto en el carrusel.
// Usada tanto en Ventas (ItemsSection) como en Inventario (MaterialsSection).

import { ImageOff } from 'lucide-react';
import styles from './ProductCard.module.css';

function getStockInfo(stock, stockMinimum) {
    if (stock === 0) return { label: 'Agotado', className: styles.stockOut };
    if (stock < stockMinimum)
        return { label: 'Stock bajo', className: styles.stockLow };
    return { label: 'Disponible', className: styles.stockOk };
}

function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

export default function ProductCard({ product, onSelect }) {
    const { label, className } = getStockInfo(product.stock, product.min_stock);
    const outOfStock = product.stock === 0;

    return (
        <div
            className={styles.productCard}
            onClick={() => !outOfStock && onSelect(product)}
            style={outOfStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
            <div className={styles.imageWrapper}>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImage}
                    />
                ) : (
                    <ImageOff size={36} className={styles.placeholderIcon} />
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
}
