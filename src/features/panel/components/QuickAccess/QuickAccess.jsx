import styles from './QuickAccess.module.css';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ShoppingCart, Package } from 'lucide-react';

const ACTIONS = [
    {
        id: 'sale',
        label: 'Nueva venta',
        path: '/sales',
        icon: DollarSign,
        color: 'pink',
    },
    {
        id: 'purchase',
        label: 'Nueva compra',
        path: '/purchases',
        icon: ShoppingCart,
        color: 'blue',
    },
    {
        id: 'product',
        label: 'Nuevo producto',
        path: '/inventory',
        icon: Package,
        color: 'green',
    },
];

export default function QuickAccess() {
    const navigate = useNavigate();

    return (
        <div className={styles.row}>
            {ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                    <button
                        key={a.id}
                        className={`${styles.btn} ${styles[a.color]}`}
                        onClick={() => navigate(a.path)}
                    >
                        <div className={styles.iconWrap}>
                            <Icon size={20} />
                        </div>
                        <span className={styles.label}>{a.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
