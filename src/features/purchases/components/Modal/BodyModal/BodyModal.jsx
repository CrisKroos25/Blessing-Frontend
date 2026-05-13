import PurchaseOriginSection from './sectionsBody/PurchaseOriginSection';
import PurchaseItemsDetailSection from './sectionsBody/PurchaseItemsDetailSection';

export default function BodyModal({ purchase }) {
    return (
        <>
            <PurchaseOriginSection purchase={purchase} />
            <PurchaseItemsDetailSection details={purchase.details} total={purchase.total} />
        </>
    );
}