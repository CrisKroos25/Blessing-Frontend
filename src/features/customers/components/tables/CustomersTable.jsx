// features/customers/components/tables/CustomersTable.jsx

import styles from './CustomersTable.module.css';
import { Pencil, Trash2, User, PowerOff, Power } from 'lucide-react';

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
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td colSpan={7} className={styles.empty}>
                                <div className={styles.containerEmpty}>
                                    <User size={28} />
                                    <span>No existen clientes registrados</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        customers.map((customer) => (
                            <tr
                                key={customer.id}
                                className={`${styles.row} ${!customer.is_active ? styles.rowInactive : ''}`}
                            >
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
                                    <span
                                        className={
                                            customer.is_active
                                                ? styles.badgeActive
                                                : styles.badgeInactive
                                        }
                                    >
                                        {customer.is_active
                                            ? 'Activo'
                                            : 'Inactivo'}
                                    </span>
                                </td>
                                <td className={styles.tdCenter}>
                                    <div className={styles.actions}>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() =>
                                                openModal('edit', customer)
                                            }
                                            title="Editar"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        {customer.is_active ? (
                                            <button
                                                className={styles.deactivateBtn}
                                                onClick={() =>
                                                    openModal(
                                                        'deactivate',
                                                        customer,
                                                    )
                                                }
                                                title="Desactivar"
                                            >
                                                <PowerOff size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.reactivateBtn}
                                                onClick={() =>
                                                    openModal(
                                                        'reactivate',
                                                        customer,
                                                    )
                                                }
                                                title="Reactivar"
                                            >
                                                <Power size={16} />
                                            </button>
                                        )}
                                        {!customer.is_active && (
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() =>
                                                    openModal(
                                                        'delete',
                                                        customer,
                                                    )
                                                }
                                                title="Eliminar permanentemente"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
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
