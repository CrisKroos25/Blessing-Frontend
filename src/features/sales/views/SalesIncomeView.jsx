import { useSaleForm } from '../hooks/useSaleForm';
import { useSaleValidation } from '../hooks/useSaleValidation';
import { useSales } from '../hooks/useSales';
import { useToastContext } from '@/shared/context/ToastContext';

import { useSearch } from '@/features/inventory/hooks/useSearch';
import { useTableFilters } from '@/features/inventory/hooks/useTableFilters';

import styles from './SalesIncomeView.module.css';
import ClientSection from '../components/form/ClientSection';
import ItemsSection from '../components/form/ItemsSection';
import TotalSection from '../components/form/TotalSection';

export default function SalesIncomeView() {
    const { products, createSale, isLoading, error } = useSales();
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

    const handleSubmit = async () => {
        const isValid = validate({ customer, items });
        if (!isValid) return;

        const payload = {
            customer_name: customer.customer_name,
            telephone: customer.telephone,
            nit: customer.nit || null,
            address: customer.address || null,
            contact_method: customer.contact_method || null,
            total,
            items: items.map((i) => ({
                item_id: i.itemId,
                quantity: i.quantity,
                unit_price: i.unitPrice,
            })),
        };

        const result = await createSale(payload);

        if (result.success) {
            resetForm();
            resetErrors();
            toast.success(`Venta registrada correctamente.`);
        } else {
            // result.message viene del backend: "Stock insuficiente para Peluche Oso. Disponible: 2"
            toast.error(result.message, 'error');
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
                isLoading={isLoading} // ← deshabilita el botón mientras carga
            />
        </div>
    );
}
