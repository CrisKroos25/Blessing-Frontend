import styles from './SuppliersTable.module.css';
import { Pencil, Trash2, PowerOff, Power, Truck } from 'lucide-react';

export default function SuppliersTable({ suppliers = [], openModal }) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thLeft}>NOMBRE</th>
                        <th>CONTACTO</th>
                        <th>TELÉFONO</th>
                        <th>NIT</th>
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.length === 0 ? (
                        <tr>
                            <td colSpan={6} className={styles.empty}>
                                <div className={styles.containerEmpty}>
                                    <Truck size={28} />
                                    <span>No existen proveedores registrados</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        suppliers.map((supplier) => (
                            <tr key={supplier.id} className={`${styles.row} ${!supplier.is_active ? styles.rowInactive : ''}`}>
                                <td className={styles.tdLeft}>{supplier.name}</td>
                                <td className={styles.tdCenter}>{supplier.contact || '—'}</td>
                                <td className={styles.tdCenter}>{supplier.phone || '—'}</td>
                                <td className={styles.tdCenter}>{supplier.nit || '—'}</td>
                                <td className={styles.tdCenter}>
                                    <span className={supplier.is_active ? styles.badgeActive : styles.badgeInactive}>
                                        {supplier.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className={styles.tdCenter}>
                                    <div className={styles.actions}>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() => openModal('edit', supplier)}
                                            title="Editar"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        {supplier.is_active ? (
                                            <button
                                                className={styles.deactivateBtn}
                                                onClick={() => openModal('deactivate', supplier)}
                                                title="Desactivar"
                                            >
                                                <PowerOff size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.reactivateBtn}
                                                onClick={() => openModal('reactivate', supplier)}
                                                title="Reactivar"
                                            >
                                                <Power size={16} />
                                            </button>
                                        )}
                                        {!supplier.is_active && (
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => openModal('delete', supplier)}
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