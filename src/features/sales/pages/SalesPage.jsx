import SalesLayout from '../sectionsPage/SalesLayout';
import InventoryCards from '@/features/inventory/sectionsPage/InventoryCards';
import { useSales } from '../hooks/useSales';

export default function SalesPage() {
    const { products, sales, createSale, isLoading, error } = useSales();

    return (
        <>
            <InventoryCards products={products} />
            <SalesLayout
                products={products}
                sales={sales}
                createSale={createSale}
                loading={isLoading}
                error={error}
            />
        </>
    );
}
