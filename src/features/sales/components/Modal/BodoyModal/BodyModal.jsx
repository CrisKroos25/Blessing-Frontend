import SaleCustomerSection from './sectionsBody/SaleCustomerSection';
import SaleItemsSection from './sectionsBody/SaleItemsSection';
import SaleTotalsSection from './sectionsBody/SaleTotalsSection';

export default function BodyModal({ sale }) {
    return (
        <>
            <SaleCustomerSection sale={sale} />
            <SaleItemsSection items={sale.items} total={sale.total} />
        </>
    );
}
