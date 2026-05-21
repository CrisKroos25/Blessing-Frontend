import { usePurchases } from '../hooks/usePurchases';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import { usePurchaseForm } from '../hooks/usePurchaseForm';
import { usePurchaseValidation } from '../hooks/usePurchaseValidation';
import { useToastContext } from '@/shared/context/ToastContext';
import styles from './NewPurchaseView.module.css';
import OriginSection from '../components/form/OriginSection';
import PurchaseItemsSection from '../components/form/PurchaseItemsSection';
import PurchaseTotalSection from '../components/form/PurchaseTotalSection';

export default function NewPurchaseView() {
    const { items, createPurchase, isLoading } = usePurchases();
    const { suppliers, places } = useSuppliers();
    const toast = useToastContext();

    const {
        meta, handleMetaChange,
        details, addItem, updateDetail, removeDetail,
        total, resetForm,
    } = usePurchaseForm();

    const { errors, validate, resetErrors } = usePurchaseValidation();

    const handleSubmit = async () => {
        const isValid = validate({ meta, details });
        if (!isValid) return;

        const payload = {
            supplier_id: meta.supplier_id || null,
            place_id:    meta.place_id    || null,
            date:        meta.date,
            total:       total.toFixed(2),
            note:        meta.note || '',
            details:     details.map((d) => ({
                item_id:    d.itemId,
                quantity:   Number(d.quantity),
                unit_price: Number(d.unitPrice),
            })),
        };

        const result = await createPurchase(payload);

        if (result.success) {
            resetForm();
            resetErrors();
            toast.success('Compra registrada correctamente.');
        } else {
            toast.error(result.message || 'Error al registrar la compra.');
        }
    };

    return (
        <div className={styles.container}>
            <OriginSection
                formData={meta}
                onChange={handleMetaChange}
                suppliers={suppliers}
                places={places}
                errors={errors.meta}
            />
            <PurchaseItemsSection
                items={items}
                onAdd={addItem}
                error={errors.details}
            />
            <PurchaseTotalSection
                details={details}
                total={total}
                onUpdateDetail={updateDetail}
                onRemove={removeDetail}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
