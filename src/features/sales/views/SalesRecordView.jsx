import styles from './SalesRecordView.module.css';
import { Plus } from 'lucide-react';
import { useSearch } from '@/features/inventory/hooks/useSearch';
import { useTableFilters } from '@/features/inventory/hooks/useTableFilters';
import { useModalState } from '@/features/inventory/hooks/useModalState';
import SalesTable from '../components/tables/SalesTable';
import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';
import Modal from '@/features/inventory/components/Modal/Modal';
import Button from '@/shared/components/button/Button';

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
                    action={
                        <Button
                            onClick={() => openModal('create', null)}
                            colorButton="#FF9800"
                            logoButton={Plus}
                        >
                            Agregar producto
                        </Button>
                    }
                />
                <SalesTable sales={filtered} openModal={openModal} />

                <Modal modalState={modalState} onClose={closeModal} />
            </div>
        </>
    );
}
