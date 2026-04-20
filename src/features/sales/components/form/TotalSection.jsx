// TotalSection.jsx
// Sección 3 del formulario de venta: resumen de items, total y confirmación.
// Solo lee — no modifica estado directamente. Delega en los handlers del padre.

import { Trash } from 'lucide-react';
import styles from './TotalSection.module.css';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

// ── Componente ───────────────────────────────────────────────────────────────

export default function TotalSection({
    items,
    total,
    onUpdateQuantity,
    onRemove,
    onSubmit,
}) {
    return (
        <div className={styles.section}>
            {/* ── Header ───────────────────────────────────────────────── */}
            <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>3</span>
                <h2 className={styles.sectionTitle}>Resumen</h2>
            </div>

            {/* ── Tabla de items agregados ──────────────────────────────── */}
            {items.length === 0 ? (
                <p className={styles.emptyItems}>
                    Aún no has agregado productos a esta venta
                </p>
            ) : (
                <>
                    {/* Encabezado de columnas */}
                    <div className={styles.tableHeader}>
                        <span className={styles.tableHeaderCell}>Producto</span>
                        <span className={styles.tableHeaderCell}>Cant.</span>
                        <span className={styles.tableHeaderCell}>Precio</span>
                        <span className={styles.tableHeaderCell}>Subtotal</span>
                    </div>

                    {/* Filas */}
                    {items.map((item) => (
                        <div key={item.itemId} className={styles.tableRow}>
                            {/* Nombre + botón eliminar */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                            >
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => onRemove(item.itemId)}
                                    title="Eliminar"
                                >
                                    <Trash size={14} />
                                </button>
                                <span className={styles.itemName}>
                                    {item.name}
                                </span>
                            </div>

                            {/* Input cantidad — editable directo en la tabla */}
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                    onUpdateQuantity(
                                        item.itemId,
                                        e.target.value,
                                    )
                                }
                                className={styles.cantidadInput}
                            />

                            {/* Precio unitario */}
                            <span className={styles.itemPrecio}>
                                {formatPrice(item.unitPrice)}
                            </span>

                            {/* Subtotal calculado */}
                            <span className={styles.itemSubtotal}>
                                {formatPrice(item.unitPrice * item.quantity)}
                            </span>
                        </div>
                    ))}
                </>
            )}

            {/* ── Resumen y total ───────────────────────────────────────── */}
            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Productos</span>
                    <span className={styles.summaryValue}>{items.length}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Unidades</span>
                    <span className={styles.summaryValue}>
                        {/* Total de unidades sumando todas las cantidades */}
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                </div>

                <hr className={styles.divider} />

                <div className={styles.summaryRow}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalValue}>
                        {formatPrice(total)}
                    </span>
                </div>
            </div>

            {/* ── Botón confirmar ───────────────────────────────────────── */}
            <button
                className={styles.confirmBtn}
                onClick={onSubmit}
                disabled={items.length === 0}
            >
                Confirmar venta
            </button>
        </div>
    );
}
