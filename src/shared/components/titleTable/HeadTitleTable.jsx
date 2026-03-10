import styles from './HeadTitleTable.module.css';

export default function SectionHeader({ title, subtitle, action }) {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                {subtitle && (
                    <span className={styles.subtitle}>{subtitle}</span>
                )}
            </div>

            {action && <div>{action}</div>}
        </div>
    );
}
