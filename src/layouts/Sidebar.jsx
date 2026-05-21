import { NavLink } from 'react-router-dom';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../shared/constants/navigationItems';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onToggle }) {
    return (
        <aside
            className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
        >
            {/* ── Botón toggle arriba ── */}
            <button
                className={styles.toggleBtn}
                onClick={onToggle}
                aria-label={isOpen ? 'Colapsar menú' : 'Expandir menú'}
            >
                {isOpen ? (
                    <PanelLeftClose size={20} />
                ) : (
                    <PanelLeftOpen size={20} />
                )}
            </button>

            {/* ── Brand: logo + texto ── */}
            <div className={styles.brand}>
                <img
                    src="/BlessingIcon.png"
                    alt="BlessingIcon"
                    className={styles.logo}
                />

                <div className={styles.brandInfo}>
                    <div className={styles.subtitleRow}>
                        <h1 className={styles.subtitle}>Blessing</h1>
                    </div>
                    <p className={styles.subtitle}>Sistema de gestión</p>
                </div>
            </div>

            {/* ── Navegación ── */}
            <nav className={styles.nav}>
                <ul className={styles.menu}>
                    {NAVIGATION_ITEMS.map(({ id, path, icon: Icon, label }) => (
                        <li key={id}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `${styles.menuItem} ${isActive ? styles.active : ''}`
                                }
                                title={
                                    !isOpen ? label : undefined
                                } /* tooltip al colapsar */
                            >
                                <span className={styles.iconWrapper}>
                                    <Icon size={18} />
                                </span>
                                <span className={styles.label}>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
