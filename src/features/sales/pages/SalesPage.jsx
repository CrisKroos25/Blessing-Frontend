import SalesLayout from '../sectionsPage/SalesLayout';
import InventoryCards from '@/features/inventory/sectionsPage/InventoryCards';
import { useSales } from '../hooks/useSales';

export default function SalesPage() {
    const { products, sales, customers, createSale, isLoading, error } =
        useSales();

    return (
        <>
            <InventoryCards products={products} />
            <SalesLayout
                products={products}
                sales={sales}
                customers={customers}
                createSale={createSale}
                loading={isLoading}
                error={error}
            />
        </>
    );
}
