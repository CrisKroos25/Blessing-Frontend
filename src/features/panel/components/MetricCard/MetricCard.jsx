import styles from './MetricCard.module.css';

export default function MetricCard({ icon: Icon, value, label, sub, status = 'default' }) {
    return (
        <div className={`${styles.card} ${styles[status]}`}>
            <div className={styles.iconWrap}>
                <Icon size={20} />
            </div>
            <div className={styles.content}>
                <p className={styles.value}>{value}</p>
                <p className={styles.label}>{label}</p>
                {sub && <p className={styles.sub}>{sub}</p>}
            </div>
        </div>
    );
}
