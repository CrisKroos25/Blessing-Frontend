// FinalProductsView.jsx
import InventoryView from './InventoryView';

export default function FinalProductsView({
    products,
    create,
    update,
    remove,
    allProducts,
}) {
    return (
        <InventoryView
            title="Productos finales"
            subtitle="Arreglos y productos ensamblados"
            defaultType="Finales"
            products={products}
            allProducts={allProducts}
            create={create}
            update={update}
            remove={remove}
        />
    );
}
