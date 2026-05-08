// ============================================================
// MaterialsRow.jsx
// ------------------------------------------------------------
// Renderiza una sola fila de la tabla con los datos
// de un producto. También maneja la alerta de stock bajo
// y los botones de editar / eliminar.
// ============================================================

import styles from './SalesRow.module.css';
import { Eye } from 'lucide-react';

// Mapeamos los valores internos a textos legibles para el usuario.
// Así la tabla nunca muestra 'raw' o 'final' directamente.

export default function SalesRow({ sale, openModal }) {
    // Si el stock actual es menor al mínimo definido,
    // mostramos una alerta visual en la fila
    return (
        <tr className={styles.row}>
            <td className={styles.fontBold}>
                {new Date(sale.created_at).toLocaleString('es-GT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                })}
            </td>
            <td>{sale.customer_name}</td>
            <td className={styles.font_bold}>{sale.telephone}</td>
            <td>{sale.items.length}</td>
            <td>{sale.total}</td>
            <td>{sale.total}</td>
            <td className={styles.container__button}>
                <button
                    onClick={() => {
                        openModal('edit', sale);
                    }}
                    className={styles.button__options}
                >
                    {<Eye size={'20px'} />}
                </button>
            </td>
        </tr>
    );
}
