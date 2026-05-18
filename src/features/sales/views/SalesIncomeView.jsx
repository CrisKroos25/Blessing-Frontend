import styles from './SalesIncomeView.module.css';

import { useState } from 'react';

import { useToastContext } from '@/shared/context/ToastContext';
import { useSearch } from '@/shared/hooks/useSearch';
import { useTableFilters } from '@/shared/hooks/useTableFilters';

import SalesHeadTitle from '@/features/sales/components/viewHeader/SalesHeadTitle';
import ClientSection from '@/features/sales/components/form/ClientSection';
import ItemsSection from '@/features/sales/components/form/ItemsSection';
import TotalSection from '@/features/sales/components/form/TotalSection';
import { useSaleForm } from '@/features/sales/hooks/useSaleForm';
import { useSaleValidation } from '@/features/sales/hooks/useSaleValidation';

export default function SalesIncomeView({
    customers,
    products,
    createSale,
    loading,
    error,
}) {
    const toast = useToastContext();

    const {
        customer,
        handleCustomerChange,
        handleSelectCustomer,
        handleClearCustomer,
        items,
        addItem,
        updateQuantity,
        removeItem,
        total,
        resetForm,
    } = useSaleForm();

    const { errors, validate, resetErrors } = useSaleValidation();

    // 1. Filtra por texto
    const { query, setQuery, filtered } = useSearch(products, 'name');

    // 2. Filtra y ordena el resultado de useSearch
    const { result, filters, categories, setFilter, resetFilters } =
        useTableFilters(filtered);

    // 3. Bloquea el boton
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        const isValid = validate({ customer, items });
        if (!isValid) return;

        setIsSubmitting(true);

        const payload = {
            customer_name: customer.customer_name,
            telephone: customer.telephone,
            nit: customer.nit || null,
            address: customer.address || null,
            contact_method: customer.contact_method || null,
            payment_method: customer.payment_method,
            notes: customer.notes || null,
            total,
            items: items.map((i) => ({
                item_id: i.itemId,
                quantity: i.quantity,
                unit_price: i.unitPrice,
            })),
        };

        try {
            await createSale(payload);
            toast.success('Venta registrada correctamente.');
            resetForm();
            resetErrors();
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            toast.error(
                error?.message || 'Ocurrió un error, intenta de nuevo.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <SalesHeadTitle
                title={'Crear una venta'}
                subtitle={
                    'Complete los detalles a continuación para registrar una nueva venta.'
                }
            />
            <ClientSection
                formData={customer}
                onChange={handleCustomerChange}
                onSelectCustomer={handleSelectCustomer}
                onClearCustomer={handleClearCustomer}
                customers={customers}
                errors={errors.customer}
            />
            <ItemsSection
                products={result}
                onAdd={addItem}
                error={errors.items}
                query={query}
                onSearch={setQuery}
                // Pasar todo lo necesario para los controles de filtro
                filters={filters}
                categories={categories}
                setFilter={setFilter}
                resetFilters={resetFilters}
            />
            <TotalSection
                items={items}
                total={total}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                loading={loading} // ← deshabilita el botón mientras carga
            />
        </div>
    );
}
