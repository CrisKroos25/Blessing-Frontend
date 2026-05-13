import styles from './SalesRecordView.module.css';

import { useSearch } from '@/shared/hooks/useSearch';
import { useModalState } from '@/shared/hooks/useModalState';

import SalesHeadTitle from '@/features/sales/components/viewHeader/SalesHeadTitle';
import SalesTable from '@/features/sales/components/tables/SalesTable';
import ModalSales from '@/features/sales/components/Modal/ModalSales';
import { useSaleFilters } from '@/features/sales/hooks/useSaleFilters';

export default function SalesRecordView({ sales }) {
    const { modalState, openModal, closeModal } = useModalState();
    const { action, item: sale } = modalState;

    // 1. Filtra por texto
    const { query, setQuery, filtered } = useSearch(sales, 'customer_name');

    // 2. Filtra y ordena el resultado de useSearch
    const { result, filters, setFilter, resetFilters } =
        useSaleFilters(filtered);

    return (
        <>
            <div className={styles.container__main}>
                <SalesHeadTitle
                    title="Ventas realizadas"
                    subtitle="Historial de transacciones y productos vendidos"
                    query={query}
                    onSearch={setQuery}
                    filters={filters}
                    setFilter={setFilter}
                    resetFilters={resetFilters}
                />
                <SalesTable sales={result} openModal={openModal} />

                {
                    // Si no hay tipo, el modal está cerrado. No se renderiza nada
                }
                {!action && !sale ? null : (
                    <ModalSales
                        key={modalState.item?.id ?? 'view'}
                        sale={sale}
                        onClose={closeModal}
                    />
                )}
            </div>
        </>
    );
}
