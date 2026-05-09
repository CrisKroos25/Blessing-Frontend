import styles from './SalesIncomeView.module.css';

import { useState } from 'react';

import { useSaleForm } from '../hooks/useSaleForm';
import { useSaleValidation } from '../hooks/useSaleValidation';

import { useToastContext } from '@/shared/context/ToastContext';
import { useSearch } from '@/shared/hooks/useSearch';
import { useTableFilters } from '@/shared/hooks/useTableFilters';

import ClientSection from '../components/form/ClientSection';
import ItemsSection from '../components/form/ItemsSection';
import TotalSection from '../components/form/TotalSection';

export default function SalesIncomeView({
    products,
    createSale,
    loading,
    error,
}) {
    const toast = useToastContext();

    const {
        customer,
        handleCustomerChange,
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
            <ClientSection
                formData={customer}
                onChange={handleCustomerChange}
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
