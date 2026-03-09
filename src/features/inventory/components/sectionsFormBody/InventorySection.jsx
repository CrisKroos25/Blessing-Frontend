import styles from './InventorySection.module.css';

export default function InventorySection() {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <div className={styles.sectionNumber}>2</div>
                    <div className={styles.sectionTitle}>
                        Control de inventario
                    </div>
                </div>
            </section>
        </>
    );
}
