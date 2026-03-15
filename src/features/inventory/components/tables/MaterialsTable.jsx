// ============================================================
// MaterialsTable.jsx
// ------------------------------------------------------------
// Renderiza la tabla completa de materiales.
// Recibe los productos y la función para abrir el modal,
// y delega cada fila a MaterialsRow.
// ============================================================

import styles from './MaterialsTable.module.css';
import MaterialsRow from './MaterialsRow';
import { PackageOpen } from 'lucide-react';

export default function MaterialsTable({ openModal, products }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Stock actual</th>
                    <th>Stock mínimo</th>
                    <th>Estatus</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.length === 0 ? (
                    // Si no hay productos, mostramos un mensaje en lugar
                    // de una tabla vacía que confunde al usuario.
                    // colSpan={8} hace que la celda ocupe todas las columnas.
                    <tr>
                        <td colSpan={8} className={styles.empty}>
                            <div className={styles.containerEmpty}>
                                <PackageOpen size={30} />
                                <span>No existen productos registrados.</span>
                            </div>
                        </td>
                    </tr>
                ) : (
                    // Si hay productos, renderizamos una fila por cada uno.
                    // key={product.id} le dice a React cómo identificar
                    // cada fila — importante para que las actualizaciones
                    // de la lista sean eficientes.
                    products.map((product) => (
                        <MaterialsRow
                            key={product.id}
                            product={product}
                            openModal={openModal}
                        />
                    ))
                )}
            </tbody>
        </table>
    );
}
