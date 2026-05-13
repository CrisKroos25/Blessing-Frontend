// ============================================================
// CustomersTable.jsx
// ------------------------------------------------------------
// Renderiza la tabla completa de materiales.
// Recibe los productos y la función para abrir el modal,
// y delega cada fila a MaterialsRow.
// ============================================================

import styles from './CustomersTable.module.css';

export default function CustomersTable({}) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Nit</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    );
}
