import styles from './MaterialsTable.module.css';
import MaterialsRow from './MaterialsRow';

export default function MaterialsTable({ openModal, products }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre de producto</th>
                    <th>Categoria</th>
                    <th>Stock actual</th>
                    <th>Stock minimo</th>
                    <th>Estatus</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <MaterialsRow
                        key={product.id}
                        product={product}
                        openModal={openModal}
                    />
                ))}
            </tbody>
        </table>
    );
}
