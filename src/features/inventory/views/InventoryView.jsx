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

import { useSearch } from '@/shared/hooks/useSearch';
import { useTableFilters } from '@/shared/hooks/useTableFilters';
import { useModalState } from '@/shared/hooks/useModalState';
import Button from '@/shared/components/button/Button';

import MaterialsTable from '@/features/inventory/components/tables/MaterialsTable';
import ModalProducts from '@/features/inventory/components/modal/ModalProducts';
import ViewHeader from '@/features/inventory/components/viewHeader/viewHeader';

export default function InventoryView({
    title,
    subtitle,
    defaultType,
    products,
    create,
    update,
    remove,
    allProducts,
    loading,
    error,
}) {
    const { modalState, openModal, closeModal } = useModalState();
    const { action, item: product } = modalState;

    // 1. Filtra por texto
    const { query, setQuery, filtered } = useSearch(products, 'name');

    // 2. Filtra y ordena el resultado de useSearch
    const { result, filters, categories, setFilter, resetFilters } =
        useTableFilters(filtered);

    return (
        <div className={styles.container__main}>
            <ViewHeader
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
            <MaterialsTable
                products={result}
                openModal={openModal}
                loading={loading}
                error={error}
            />

            {!action ? null : (
                <ModalProducts
                    key={modalState.item?.id ?? 'create'}
                    action={action}
                    product={product}
                    defaultType={defaultType}
                    onClose={closeModal}
                    create={create}
                    update={update}
                    remove={remove}
                    allProducts={allProducts} // Solo lo usa FinalProducts.jsx
                />
            )}
        </div>
    );
}
