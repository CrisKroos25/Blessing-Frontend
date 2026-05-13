import styles from './PurchaseItemsDetailSection.module.css';

const formatQ = (value) => `Q${parseFloat(value).toFixed(2)}`;

export default function PurchaseItemsDetailSection({ details, total }) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>2</div>
                <div className={styles.sectionTitle}>Productos comprados</div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.thProduct}>PRODUCTO</th>
                            <th>CANT.</th>
                            <th>P.U.</th>
                            <th>SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail) => (
                            <tr key={detail.id} className={styles.row}>
                                <td className={styles.tdProduct}>
                                    <span className={styles.productName}>
                                        {detail.item_name}
                                    </span>
                                </td>
                                <td className={styles.tdCenter}>
                                    {detail.quantity}
                                </td>
                                <td className={styles.tdCenter}>
                                    {formatQ(detail.unit_price)}
                                </td>
                                <td className={styles.tdCenter}>
                                    {formatQ(detail.subtotal)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className={styles.totalRow}>
                            <td colSpan={3} className={styles.totalLabel}>
                                TOTAL
                            </td>
                            <td className={styles.totalValue}>
                                {formatQ(total)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}