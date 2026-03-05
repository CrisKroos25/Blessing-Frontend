import styles from './CardInfo.module.css';

export default function CardInfo({
    logoButton: Icon,
    numberTitle,
    titleInformation,
    description,
    status,
}) {
    return (
        <article className={styles.container}>
            {Icon && (
                <div className={`${styles.icon} ${styles[status]}`}>
                    <Icon size={20} />
                </div>
            )}

            <div className={styles.content}>
                <h2 className={styles.value}>{numberTitle}</h2>
                <p className={styles.label}>{titleInformation}</p>
                <p className={styles.meta}>{description}</p>
            </div>
        </article>
    );
}
