// ============================================================
// SalesTable.jsx
// ------------------------------------------------------------
// Renderiza la tabla completa de materiales.
// Recibe los productos y la función para abrir el modal,
// y delega cada fila a MaterialsRow.
// ============================================================

import styles from './SalesTable.module.css';
import SalesRow from './SalesRow';
import { PackageOpen } from 'lucide-react';

export default function SalesTable({ sales, openModal }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Teléfono</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Pago</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sales.length === 0 ? (
                    <tr>
                        <td colSpan={8} className={styles.empty}>
                            <div className={styles.containerEmpty}>
                                <PackageOpen size={30} />
                                <span>No existen ventas registradas.</span>
                            </div>
                        </td>
                    </tr>
                ) : (
                    sales.map((sale) => (
                        <SalesRow
                            key={sale.id}
                            sale={sale}
                            openModal={openModal}
                        />
                    ))
                )}
            </tbody>
        </table>
    );
}
