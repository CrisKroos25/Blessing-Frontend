import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../shared/constants/navigationItems';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <span className={styles.logo}>❤️</span>
                <div>
                    <h1 className={styles.title}>LoveGifts</h1>
                    <p className={styles.subtitle}>Sistema de inventario</p>
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
                                {<Icon size={18} />}
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
