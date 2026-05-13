// shared/components/ViewHeader/ViewHeader.jsx

import styles from './ViewHeader.module.css';

export default function ViewHeader({ title, subtitle, action }) {
    return (
        <div className={styles.container}>
            <div className={styles.containerOptions}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && (
                        <span className={styles.subtitle}>{subtitle}</span>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
        </div>
    );
}
