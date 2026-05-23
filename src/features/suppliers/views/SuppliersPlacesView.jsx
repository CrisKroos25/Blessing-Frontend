// features/suppliers/views/SuppliersPlacesView.jsx

import styles from './SuppliersPlacesView.module.css';
import { Plus } from 'lucide-react';
import { useSuppliers } from '../hooks/useSuppliers';
import { useModalState } from '@/shared/hooks/useModalState';
import { useSearch } from '@/shared/hooks/useSearch';
import { useToastContext } from '@/shared/context/ToastContext';
import ViewHeader from '@/shared/components/viewHeader/ViewHeader';
import Button from '@/shared/components/button/Button';
import SuppliersTable from '../components/tables/SuppliersTable';
import ModalSupplier from '../components/modal/ModalSupplier';

export default function SuppliersPlacesView() {
    const toast = useToastContext();

    const {
        suppliers, isLoading,
        createSupplier, updateSupplier,
        deactivateSupplier, reactivateSupplier, deleteSupplier,
    } = useSuppliers();

    const { modalState, openModal, closeModal } = useModalState();
    const { action, item: supplier } = modalState;
    const { query, setQuery, filtered } = useSearch(suppliers, 'name');

    const handleCreate = async (data) => {
        const r = await createSupplier(data);
        if (!r.success) throw new Error(r.message);
        toast.success('Proveedor agregado correctamente.');
    };

    const handleUpdate = async (id, data) => {
        const r = await updateSupplier(id, data);
        if (!r.success) throw new Error(r.message);
        toast.success('Proveedor actualizado correctamente.');
    };

    const handleDeactivate = async (id) => {
        const r = await deactivateSupplier(id);
        if (!r.success) throw new Error(r.message);
        toast.success('Proveedor desactivado.');
    };

    const handleReactivate = async (id) => {
        const r = await reactivateSupplier(id);
        if (!r.success) throw new Error(r.message);
        toast.success('Proveedor reactivado.');
    };

    const handleDelete = async (id) => {
        const r = await deleteSupplier(id);
        if (!r.success) throw new Error(r.message);
        toast.success('Proveedor eliminado.');
    };

    return (
        <div className={styles.container}>
            <ViewHeader
                title="Proveedores"
                subtitle="Gestión de proveedores y lugares de compra"
                query={query}
                onSearch={setQuery}
                action={
                    <Button
                        colorButton="var(--primary-color)"
                        logoButton={Plus}
                        onClick={() => openModal('create', null)}
                    >
                        Añadir proveedor
                    </Button>
                }
            />

            <SuppliersTable suppliers={filtered} openModal={openModal} />

            {action && (
                <ModalSupplier
                    action={action}
                    supplier={supplier}
                    onClose={closeModal}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDeactivate={handleDeactivate}
                    onReactivate={handleReactivate}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
