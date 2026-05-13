// ============================================================
// MaterialsRow.jsx
// ------------------------------------------------------------
// Renderiza una sola fila de la tabla con los datos
// de un producto. También maneja la alerta de stock bajo
// y los botones de editar / eliminar.
// ============================================================

import styles from './SalesRow.module.css';
import { Eye } from 'lucide-react';

import { Banknote, CreditCard, Repeat } from 'lucide-react';

// Mapeamos los valores internos a textos legibles para el usuario.
// Así la tabla nunca muestra 'raw' o 'final' directamente.

const PAYMENT_OPTIONS = {
    efectivo: {
        label: 'Efectivo',
        icon: Banknote,
    },

    transferencia: {
        label: 'Transferencia',
        icon: Repeat,
    },

    tarjeta: {
        label: 'Tarjeta',
        icon: CreditCard,
    },
};

export default function SalesRow({ sale, openModal }) {
    const paymentMethod = PAYMENT_OPTIONS[sale.payment_method];

    // Si el stock actual es menor al mínimo definido,
    // mostramos una alerta visual en la fila
    return (
        <tr className={styles.row}>
            <td className={styles.fontBold}>
                {new Date(sale.created_at).toLocaleString('es-GT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </td>
            <td className={styles.fontBold}>
                {new Date(sale.created_at).toLocaleString('es-GT', {
                    hour: 'numeric',
                    minute: '2-digit',
                })}
            </td>
            <td>{sale.customer_name}</td>
            <td className={styles.font_bold}>{sale.telephone}</td>
            <td>{sale.items.length}</td>
            <td>{sale.total}</td>
            <td>
                {paymentMethod && (
                    <div className={styles.paymentMethod}>
                        <span>{<paymentMethod.icon size={16} />} </span>

                        <span>{paymentMethod.label}</span>
                    </div>
                )}
            </td>
            <td className={styles.container__button}>
                <button
                    onClick={() => {
                        openModal('edit', sale);
                    }}
                    className={styles.button__options}
                >
                    {<Eye size={'20px'} />} Ver Venta
                </button>
            </td>
        </tr>
    );
}
