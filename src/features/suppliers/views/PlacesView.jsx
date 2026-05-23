// features/suppliers/views/PlacesView.jsx

import styles from './SuppliersPlacesView.module.css';
import { Plus } from 'lucide-react';
import { useModalState } from '@/shared/hooks/useModalState';
import { useSearch } from '@/shared/hooks/useSearch';
import { useToastContext } from '@/shared/context/ToastContext';
import ViewHeader from '@/shared/components/viewHeader/ViewHeader';
import Button from '@/shared/components/button/Button';
import PlacesTable from '../components/tables/PlacesTable';
import ModalPlace from '../components/modal/ModalPlace';

export default function PlacesView({ places, isLoading, createPlace, updatePlace, deactivatePlace, reactivatePlace, deletePlace }) {
    const toast = useToastContext();
    const { modalState, openModal, closeModal } = useModalState();
    const { action, item: place } = modalState;
    const { query, setQuery, filtered } = useSearch(places, 'name');

    const handleCreate = async (data) => {
        const r = await createPlace(data);
        if (!r.success) throw new Error(r.message);
        toast.success('Lugar agregado correctamente.');
    };

    const handleUpdate = async (id, data) => {
        const r = await updatePlace(id, data);
        if (!r.success) throw new Error(r.message);
        toast.success('Lugar actualizado correctamente.');
    };

    const handleDeactivate = async (id) => {
        const r = await deactivatePlace(id);
        if (!r.success) throw new Error(r.message);
        toast.success('Lugar desactivado.');
    };

    const handleReactivate = async (id) => {
        const r = await reactivatePlace(id);
        if (!r.success) throw new Error(r.message);
        toast.success('Lugar reactivado.');
    };

    const handleDelete = async (id) => {
        const r = await deletePlace(id);
        if (!r.success) throw new Error(r.message);
        toast.success('Lugar eliminado.');
    };

    return (
        <div className={styles.container}>
            <ViewHeader
                title="Lugares de compra"
                subtitle="Gestión de lugares donde se realizan las compras"
                query={query}
                onSearch={setQuery}
                action={
                    <Button
                        colorButton="var(--primary-color)"
                        logoButton={Plus}
                        onClick={() => openModal('create', null)}
                    >
                        Añadir lugar
                    </Button>
                }
            />

            <PlacesTable places={filtered} openModal={openModal} />

            {action && (
                <ModalPlace
                    action={action}
                    place={place}
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
