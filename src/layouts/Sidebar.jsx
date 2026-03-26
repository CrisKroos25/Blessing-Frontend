import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../shared/constants/navigationItems';
import styles from './Sidebar.module.css';
import { Gift } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <div className={styles.logoWrapper}>
                    <Gift
                        size={22}
                        strokeWidth={2}
                        className={styles.logoIcon}
                    />
                </div>
                <div className={styles.brandText}>
                    <h1 className={styles.title}>Blessing</h1>
                    <p className={styles.subtitle}>Inventario</p>
                </div>
            </div>

            <nav>
                <ul className={styles.menu}>
                    {NAVIGATION_ITEMS.map(({ id, path, icon: Icon, label }) => (
                        <li key={id}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `${styles.menuItem} ${isActive ? styles.active : ''}`
                                }
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
