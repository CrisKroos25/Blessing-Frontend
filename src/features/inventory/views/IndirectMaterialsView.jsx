// IndirectMaterialsView.jsx
import InventoryView from './InventoryView';

export default function IndirectMaterialsView({
    products,
    create,
    update,
    remove,
}) {
    return (
        <InventoryView
            title="Materiales indirectos"
            subtitle="Insumos y materiales de uso general"
            defaultType="supply"
            products={products}
            create={create}
            update={update}
            remove={remove}
        />
    );
}
