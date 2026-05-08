import styles from './SalesRecordView.module.css';

import { useSearch } from '@/shared/hooks/useSearch';
import { useTableFilters } from '@/shared/hooks/useTableFilters';
import { useModalState } from '@/shared/hooks/useModalState';
import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';

import SalesTable from '../components/tables/SalesTable';
import Modal from '../components/Modal/Modal';

export default function SalesRecordView({ sales }) {
    const { modalState, openModal, closeModal } = useModalState();

    // 1. Filtra por texto
    const { query, setQuery, filtered } = useSearch(sales, 'customer_name');

    // 2. Filtra y ordena el resultado de useSearch
    const { result, filters, categories, setFilter, resetFilters } =
        useTableFilters(filtered);

    return (
        <>
            <div className={styles.container__main}>
                <HeadTitleTable
                    title={'Ventas realizadas'}
                    subtitle={'Historial de transacciones y productos vendidos'}
                    query={query}
                    onSearch={setQuery}
                    // Pasamos todo lo necesario para los controles de filtro
                    filters={filters}
                    categories={categories}
                    setFilter={setFilter}
                    resetFilters={resetFilters}
                />
                <SalesTable sales={filtered} openModal={openModal} />

                <Modal
                    key={modalState.item?.id ?? 'view'}
                    modalState={modalState}
                    onClose={closeModal}
                />
            </div>
        </>
    );
}
