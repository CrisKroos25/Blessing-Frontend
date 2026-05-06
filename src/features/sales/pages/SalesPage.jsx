import SalesLayout from '../sectionsPage/SalesLayout';
import { useSales } from '../hooks/useSales';

export default function SalesPage() {
    const { products, sales, createSale, isLoading, error } = useSales();

    return (
        <>
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
