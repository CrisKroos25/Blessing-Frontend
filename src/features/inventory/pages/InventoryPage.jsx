import InventoryLayout from '@/features/inventory/components/sectionsPage/InventoryLayout';
import InventoryCards from '@/features/inventory/components/sectionsPage/InventoryCards';
import { useProducts } from '../hooks/useProducts';

export default function InventoryPage() {
    const { products, loading, error, create, update, remove } = useProducts();

    return (
        <>
            <InventoryCards />

            <InventoryLayout products={products} create={create} />
        </>
    );
}
