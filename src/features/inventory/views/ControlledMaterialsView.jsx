// ControlledMaterialsView.jsx
import InventoryView from './InventoryView';

export default function ControlledMaterialsView({
    products,
    create,
    update,
    remove,
}) {
    return (
        <InventoryView
            title="Materiales controlados"
            subtitle="Materias primas y componentes"
            defaultType="product"
            products={products}
            create={create}
            update={update}
            remove={remove}
        />
    );
}
