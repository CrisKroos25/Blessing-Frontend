import styles from './HeadTitleTable.module.css';
import { Search } from 'lucide-react';

export default function SectionHeader({
    title,
    subtitle,
    action,
    query,
    onSearch,
}) {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                {subtitle && (
                    <span className={styles.subtitle}>{subtitle}</span>
                )}
            </div>

            <div className={styles.contentOptions}>
                <div className={styles.center}>
                    <div className={styles.search_wrapper}>
                        <span className={styles.search_icon}>{<Search />}</span>
                        <input
                            id="search"
                            type="text"
                            value={query}
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="Buscar producto"
                            className={styles.input}
                        />
                    </div>
                </div>

                {action && <div>{action}</div>}
            </div>
        </div>
    );
}
