// features/sales/components/saleDetail/SaleItemsSection.jsx

import styles from './SaleItemsSection.module.css';

const formatQ = (value) => `Q${parseFloat(value).toFixed(2)}`;

export default function SaleItemsSection({ items, total }) {
    return (
        <section className={styles.section}>
            {/* ── Header de sección ── */}
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>2</div>
                <div className={styles.sectionTitle}>Productos vendidos</div>
            </div>

            {/* ── Tabla ── */}
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
                        {items.map((item) => (
                            <>
                                <tr key={item.id} className={styles.row}>
                                    <td className={styles.tdProduct}>
                                        <span className={styles.productName}>
                                            {item.product_name}
                                        </span>
                                        {item.type === 'bundle' && (
                                            <span
                                                className={styles.bundleBadge}
                                            >
                                                Arreglo
                                            </span>
                                        )}
                                    </td>
                                    <td className={styles.tdCenter}>
                                        {item.quantity}
                                    </td>
                                    <td className={styles.tdCenter}>
                                        {formatQ(item.unit_price)}
                                    </td>
                                    <td className={styles.tdCenter}>
                                        {formatQ(item.subtotal)}
                                    </td>
                                </tr>

                                {/* Componentes del bundle inline */}
                                {item.type === 'bundle' &&
                                    item.components?.length > 0 && (
                                        <tr
                                            key={`${item.id}-components`}
                                            className={styles.componentsRow}
                                        >
                                            <td
                                                colSpan={4}
                                                className={styles.componentsTd}
                                            >
                                                <ul
                                                    className={
                                                        styles.componentsList
                                                    }
                                                >
                                                    {item.components.map(
                                                        (c, idx) => (
                                                            <li
                                                                key={idx}
                                                                className={
                                                                    styles.componentItem
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.componentDot
                                                                    }
                                                                />
                                                                {c.name}
                                                                <span
                                                                    className={
                                                                        styles.componentQty
                                                                    }
                                                                >
                                                                    x
                                                                    {c.quantity}
                                                                </span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                            </>
                        ))}
                    </tbody>

                    {/* ── Total dentro de la tabla ── */}
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
