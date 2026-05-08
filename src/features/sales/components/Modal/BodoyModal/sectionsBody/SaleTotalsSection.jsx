// features/sales/components/saleDetail/SaleTotalsSection.jsx

import styles from './SaleTotalsSection.module.css';

const formatQ = (value) => `Q${parseFloat(value).toFixed(2)}`;

export default function SaleTotalsSection({ total }) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>3</div>
                <div className={styles.sectionTitle}>Resumen</div>
            </div>

            <div className={styles.totalRow}>
                <span className={styles.totalLabel}>TOTAL</span>
                <span className={styles.totalValue}>{formatQ(total)}</span>
            </div>
        </section>
    );
}
