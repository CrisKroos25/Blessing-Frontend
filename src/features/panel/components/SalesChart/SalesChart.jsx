import styles from './SalesChart.module.css';

const formatQ = (v) => `Q${Number(v).toFixed(0)}`;

export default function SalesChart({ data = [] }) {
    if (data.length === 0) {
        return <p className={styles.empty}>Sin ventas este mes.</p>;
    }

    return (
        <div className={styles.chart}>
            {data.map((item, i) => (
                <div key={item.name} className={styles.row}>
                    <span className={styles.label}>{item.name}</span>
                    <div className={styles.track}>
                        <div
                            className={styles.fill}
                            style={{
                                width: `${item.pct}%`,
                                opacity: 1 - i * 0.2,
                            }}
                        />
                    </div>
                    <span className={styles.val}>{formatQ(item.total)}</span>
                </div>
            ))}
        </div>
    );
}
