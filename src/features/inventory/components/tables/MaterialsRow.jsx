// ============================================================
// MaterialsRow.jsx
// ------------------------------------------------------------
// Renderiza una sola fila de la tabla con los datos
// de un producto. También maneja la alerta de stock bajo
// y los botones de editar / eliminar.
// ============================================================

import styles from './MaterialsRow.module.css';
import { Pencil, Trash2 } from 'lucide-react';
import { getProductStatus } from '@shared/utils/productUtils';

// Mapeamos los valores internos a textos legibles para el usuario.
// Así la tabla nunca muestra 'raw' o 'final' directamente.

const STATUS_LABELS = {
    active: 'Disponible',
    inactive: 'Agotado',
    low: 'Stock Bajo',
};

export default function MaterialsRow({ product, openModal }) {
    // Si el stock actual es menor al mínimo definido,
    // mostramos una alerta visual en la fila
    const status = getProductStatus(product);
    return (
        <tr className={styles.row}>
            <td>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                    />
                ) : (
                    <div className={styles.imagePlaceholder}></div>
                )}
            </td>
            <td className={styles.fontBold}>{product.name}</td>
            <td>{product.category_name}</td>
            <td className={styles.fontBold}>{product.stock}</td>
            <td>{product.min_stock}</td>
            <td>
                <span className={`${styles.badge} ${styles[status]}`}>
                    {STATUS_LABELS[status]}
                </span>
            </td>

            <td className={styles.container__button}>
                <button
                    onClick={() => openModal('edit', product)}
                    className={styles.button__options}
                >
                    {<Pencil size={16} />}
                </button>
                <button
                    onClick={() => openModal('delete', product)}
                    className={styles.button__options}
                >
                    {<Trash2 size={16} />}
                </button>
            </td>
        </tr>
    );
}
