import styles from './ActivityFeed.module.css';
import { DollarSign, ShoppingCart, Package } from 'lucide-react';

const formatQ = (v) => `Q${Number(v).toFixed(2)}`;

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `Hace ${mins} min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Hace ${hrs} hora${hrs > 1 ? 's' : ''}`;
    return new Date(dateStr).toLocaleDateString('es-GT', { day: 'numeric', month: 'short' });
};

const TYPE_CONFIG = {
    sale:      { icon: DollarSign,   colorClass: 'pink',  badgeClass: 'badgeSale' },
    purchase:  { icon: ShoppingCart, colorClass: 'blue',  badgeClass: 'badgePurchase' },
    inventory: { icon: Package,      colorClass: 'green', badgeClass: 'badgeInventory' },
};

export default function ActivityFeed({ activity = [] }) {
    if (activity.length === 0) {
        return <p className={styles.empty}>Sin actividad reciente.</p>;
    }

    return (
        <div className={styles.feed}>
            {activity.map((item) => {
                const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.sale;
                const Icon = cfg.icon;
                return (
                    <div key={item.id} className={styles.row}>
                        <div className={`${styles.iconWrap} ${styles[cfg.colorClass]}`}>
                            <Icon size={15} />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.label}>{item.label}</span>
                            <span className={styles.date}>{formatDate(item.date)}</span>
                        </div>
                        <span className={`${styles.badge} ${styles[cfg.badgeClass]}`}>
                            {formatQ(item.amount)}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
