import styles from './StockAlerts.module.css';

export default function StockAlerts({ alerts = [] }) {
    if (alerts.length === 0) {
        return <p className={styles.empty}>Sin alertas de stock.</p>;
    }

    return (
        <div className={styles.list}>
            {alerts.map((item) => {
                const isCritical = item.stock === 0;
                return (
                    <div key={item.id} className={styles.row}>
                        <div className={styles.dot} />
                        <div className={styles.info}>
                            <span className={styles.name}>{item.name}</span>
                            <span className={styles.stock}>
                                {item.stock === 0
                                    ? 'Sin stock'
                                    : `${item.stock} ${item.unit || 'uds'} restantes`}
                            </span>
                        </div>
                        <span className={`${styles.badge} ${isCritical ? styles.critical : styles.low}`}>
                            {isCritical ? 'Crítico' : 'Bajo'}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
