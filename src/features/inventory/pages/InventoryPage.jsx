// InventoryPage.jsx
import { useProducts } from '../hooks/useProducts';
import InventoryLayout from '../sectionsPage/InventoryLayout';

export default function InventoryPage() {
    const {
        products,
        loading,
        error,
        create,
        update,
        remove,
        deactivate,
        reactivate,
    } = useProducts();

    return (
        <>
            <InventoryLayout
                products={products}
                create={create}
                update={update}
                remove={remove}
                deactivate={deactivate}
                reactivate={reactivate}
                loading={loading}
                error={error}
            />
        </>
    );
}
