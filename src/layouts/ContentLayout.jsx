import styles from './ContentLayout.module.css';

export default function ContentLayout({ children }) {
    return <div className={styles.container_main}>{children}</div>;
}
