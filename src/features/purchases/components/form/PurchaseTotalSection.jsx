import { Trash } from 'lucide-react';
import styles from './PurchaseTotalSection.module.css';

function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

export default function PurchaseTotalSection({
    details, total, onUpdateDetail, onRemove, onSubmit, isLoading,
}) {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>3</span>
                <h2 className={styles.sectionTitle}>Resumen</h2>
            </div>

            {details.length === 0 ? (
                <p className={styles.emptyItems}>Aún no has agregado productos a esta compra</p>
            ) : (
                <>
                    <div className={styles.tableHeader}>
                        <span className={styles.tableHeaderCell}>Producto</span>
                        <span className={styles.tableHeaderCell}>Cant.</span>
                        <span className={styles.tableHeaderCell}>P. Unit.</span>
                        <span className={styles.tableHeaderCell}>Subtotal</span>
                    </div>

                    {details.map((d) => (
                        <div key={d.itemId} className={styles.tableRow}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => onRemove(d.itemId)}
                                    title="Eliminar"
                                >
                                    <Trash size={14} />
                                </button>
                                <span className={styles.itemName}>
                                    {d.name} <small className={styles.itemUnit}>({d.unit})</small>
                                </span>
                            </div>

                            <input
                                type="number"
                                min="1"
                                value={d.quantity}
                                onChange={(e) => onUpdateDetail(d.itemId, 'quantity', e.target.value)}
                                className={styles.numInput}
                            />

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={d.unitPrice}
                                onChange={(e) => onUpdateDetail(d.itemId, 'unitPrice', e.target.value)}
                                className={styles.numInput}
                            />

                            <span className={styles.itemSubtotal}>
                                {formatPrice(d.quantity * d.unitPrice)}
                            </span>
                        </div>
                    ))}
                </>
            )}

            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Productos</span>
                    <span className={styles.summaryValue}>{details.length}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Unidades</span>
                    <span className={styles.summaryValue}>
                        {details.reduce((sum, d) => sum + d.quantity, 0)}
                    </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.summaryRow}>
                    <span className={styles.totalLabel}>Total</span>
                    <span className={styles.totalValue}>{formatPrice(total)}</span>
                </div>
            </div>

            <button
                className={styles.confirmBtn}
                onClick={onSubmit}
                disabled={details.length === 0 || isLoading}
            >
                {isLoading ? 'Guardando...' : 'Confirmar compra'}
            </button>
        </div>
    );
}
