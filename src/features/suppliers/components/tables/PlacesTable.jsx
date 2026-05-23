import styles from './PlacesTable.module.css';
import { Pencil, Trash2, PowerOff, Power, MapPin } from 'lucide-react';

export default function PlacesTable({ places = [], openModal }) {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thLeft}>NOMBRE</th>
                        <th>DIRECCIÓN</th>
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {places.length === 0 ? (
                        <tr>
                            <td colSpan={4} className={styles.empty}>
                                <div className={styles.containerEmpty}>
                                    <MapPin size={28} />
                                    <span>No existen lugares registrados</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        places.map((place) => (
                            <tr key={place.id} className={`${styles.row} ${!place.is_active ? styles.rowInactive : ''}`}>
                                <td className={styles.tdLeft}>{place.name}</td>
                                <td className={styles.tdCenter}>{place.address || '—'}</td>
                                <td className={styles.tdCenter}>
                                    <span className={place.is_active ? styles.badgeActive : styles.badgeInactive}>
                                        {place.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className={styles.tdCenter}>
                                    <div className={styles.actions}>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() => openModal('edit', place)}
                                            title="Editar"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        {place.is_active ? (
                                            <button
                                                className={styles.deactivateBtn}
                                                onClick={() => openModal('deactivate', place)}
                                                title="Desactivar"
                                            >
                                                <PowerOff size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.reactivateBtn}
                                                onClick={() => openModal('reactivate', place)}
                                                title="Reactivar"
                                            >
                                                <Power size={16} />
                                            </button>
                                        )}
                                        {!place.is_active && (
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => openModal('delete', place)}
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