// features/customers/components/tables/CustomersTable.jsx

import styles from './CustomersTable.module.css';
import { Pencil, Trash2, User } from 'lucide-react';

export default function CustomersTable({ customers = [], openModal }) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thLeft}>NOMBRE</th>
                        <th>TELÉFONO</th>
                        <th>NIT</th>
                        <th>CORREO</th>
                        <th>DIRECCIÓN</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.empty}>
                                <div className={styles.containerEmpty}>
                                    <User size={28} />
                                    <span>No existen clientes registrados</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        customers.map((customer) => (
                            <tr key={customer.id} className={styles.row}>
                                <td className={styles.tdLeft}>
                                    {customer.name}
                                </td>
                                <td className={styles.tdCenter}>
                                    {customer.telephone || '—'}
                                </td>
                                <td className={styles.tdCenter}>
                                    {customer.nit || '—'}
                                </td>
                                <td className={styles.tdCenter}>
                                    {customer.email || '—'}
                                </td>
                                <td className={styles.tdCenter}>
                                    {customer.address || '—'}
                                </td>
                                <td className={styles.tdCenter}>
                                    <div className={styles.actions}>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() =>
                                                openModal('edit', customer)
                                            }
                                        >
                                            <Pencil size={17} />
                                        </button>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() =>
                                                openModal('delete', customer)
                                            }
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
