// ============================================================
// InventoryView.jsx  (componente base compartido)
// ------------------------------------------------------------
// Las 3 vistas comparten exactamente la misma estructura.
// En vez de repetir el mismo código 3 veces, este componente
// recibe el título y subtítulo como props y las 3 vistas
// simplemente lo usan con sus propios textos.
// ============================================================
// Este componente es el "director de orquesta" de esta sección.
// Su única responsabilidad es:
//   1. Saber si el Modal está abierto o cerrado (y qué tipo)
//   2. Mostrar la tabla de materiales
//   3. Pasar las acciones correctas al Modal
// ============================================================

import styles from './InventoryView.module.css';
import { Plus } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useTableFilters } from '../hooks/useTableFilters'; // ← agrega esto

import Button from '@/shared/components/button/Button';
import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';
import MaterialsTable from '../components/tables/MaterialsTable';
import Modal from '@/features/inventory/components/Modal/Modal';

// Importamos el hook que maneja el estado del modal
import { useModalState } from '../hooks/useModalState';

export default function InventoryView({
    title,
    subtitle,
    defaultType,
    products,
    create,
    update,
    remove,
    allProducts,
}) {
    const { modalState, openModal, closeModal } = useModalState();

    // 1. Filtra por texto
    const { query, setQuery, filtered } = useSearch(products, 'name');

    // 2. Filtra y ordena el resultado de useSearch
    const { result, filters, categories, setFilter, resetFilters } =
        useTableFilters(filtered);

    return (
        <div className={styles.container__main}>
            <HeadTitleTable
                title={title}
                subtitle={subtitle}
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

            {/* result ya pasó por búsqueda + filtros + orden */}
            <MaterialsTable products={result} openModal={openModal} />

            <Modal
                key={modalState.product?.id ?? 'create'}
                modalState={modalState}
                onClose={closeModal}
                create={create}
                update={update}
                remove={remove}
                defaultType={defaultType}
                allProducts={allProducts}
            />
        </div>
    );
}
