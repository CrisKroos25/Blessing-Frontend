// ============================================================
// MaterialsRow.jsx
// ------------------------------------------------------------
// Renderiza una sola fila de la tabla con los datos
// de un producto. También maneja la alerta de stock bajo
// y los botones de editar / eliminar.
// ============================================================

import styles from './MaterialsRow.module.css';
import { Pencil, Trash2, PowerOff, Power } from 'lucide-react';
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
        <tr
            className={`${styles.row} ${!product.is_activate ? styles.rowInactive : ''}`}
        >
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

            {/* ── Activo / Inactivo ── */}
            <td>
                <span
                    className={
                        product.is_activate
                            ? styles.badgeActive
                            : styles.badgeInactive
                    }
                >
                    {product.is_activate ? 'Activo' : 'Inactivo'}
                </span>
            </td>

            {/* ── Estatus de stock ── */}
            <td>
                <span className={`${styles.badge} ${styles[status]}`}>
                    {STATUS_LABELS[status]}
                </span>
            </td>

            {/* ── Acciones ── */}
            <td className={styles.actions}>
                <button
                    onClick={() => openModal('edit', product)}
                    className={styles.editBtn}
                    title="Editar"
                >
                    <Pencil size={16} />
                </button>

                {product.is_activate ? (
                    <button
                        onClick={() => openModal('deactivate', product)}
                        className={`${styles.deactivateBtn}`}
                        title="Desactivar"
                    >
                        <PowerOff size={16} />
                    </button>
                ) : (
                    <button
                        onClick={() => openModal('reactivate', product)}
                        className={styles.reactivateBtn}
                        title="Reactivar"
                    >
                        <Power size={16} />
                    </button>
                )}

                {!product.is_activate && (
                    <button
                        onClick={() => openModal('delete', product)}
                        className={styles.deleteBtn}
                        title="Eliminar permanentemente"
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </td>
        </tr>
    );
}
