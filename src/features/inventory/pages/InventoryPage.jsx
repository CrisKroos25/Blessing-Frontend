import InventoryLayout from '../sectionsPage/InventoryLayout';
import InventoryCards from '../sectionsPage/InventoryCards';
import { useProducts } from '../hooks/useProducts';

export default function InventoryPage() {
    const { products, loading, error, create, update, remove } = useProducts();

    return (
        <>
            <InventoryCards products={products} />

            <InventoryLayout
                products={products}
                create={create}
                update={update}
                remove={remove}
            />
        </>
    );
}
