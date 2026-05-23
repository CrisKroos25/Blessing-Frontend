// InventoryPage.jsx
import { useProducts } from '../hooks/useProducts';
import InventoryLayout from '../sectionsPage/InventoryLayout';
import InventoryCards from '../sectionsPage/InventoryCards';

export default function InventoryPage() {
    const { products, loading, error, create, update, remove } = useProducts();

    return (
        <>
            <InventoryLayout
                products={products}
                create={create}
                update={update}
                remove={remove}
                loading={loading}
                error={error}
            />
        </>
    );
}
