import ContentMain from '@features/inventory/components/sections/ContentMain';
import ContentCard from '@features/inventory/components/sections/ContentCard';
import { useProducts } from '../hooks/useProducts';
export default function InventoryPage() {
    const { products, loading, error, create, update, remove } = useProducts();

    return (
        <>
            <ContentCard />

            <ContentMain products={products} />
        </>
    );
}
