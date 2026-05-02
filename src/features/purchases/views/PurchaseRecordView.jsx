import { usePurchases } from '../hooks/usePurchases';
import styles from './PurchaseRecordView.module.css';

function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

export default function PurchaseRecordView() {
    const { purchases } = usePurchases();

    if (purchases.length === 0) {
        return <p className={styles.empty}>No hay compras registradas aún.</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableHeader}>
                <span className={styles.tableHeaderCell}>#</span>
                <span className={styles.tableHeaderCell}>Fecha</span>
                <span className={styles.tableHeaderCell}>Proveedor / Lugar</span>
                <span className={styles.tableHeaderCell}>Productos</span>
                <span className={styles.tableHeaderCell}>Total</span>
            </div>

            {purchases.map((p) => (
                <div key={p.id} className={styles.tableRow}>
                    <span className={styles.cell}>{p.id}</span>
                    <span className={styles.cell}>{p.date}</span>
                    <span className={styles.cell}>
                        {p.supplier?.name || p.place?.name || '—'}
                    </span>
                    <span className={styles.cell}>{p.details?.length ?? 0}</span>
                    <span className={`${styles.cell} ${styles.total}`}>
                        {formatPrice(p.total)}
                    </span>
                </div>
            ))}
        </div>
    );
}
