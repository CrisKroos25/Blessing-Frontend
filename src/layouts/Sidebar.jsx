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
                <div className={styles.logoContainer}>
                    <img
                        src="/BlessingLogo.png"
                        alt="Blessing Logo"
                        className={styles.logo}
                    />
                </div>

                <div className={styles.brandInfo}>
                    <h1 className={styles.title}>Blessing</h1>
                    <div className={styles.subtitleRow}>
                        <span className={styles.dot} />
                        <p className={styles.subtitle}>Sistema de gestión</p>
                    </div>
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
