// features/customers/views/CustomersView.jsx

import styles from './CustomersView.module.css';
import { Plus } from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';
import { useModalState } from '@/shared/hooks/useModalState';
import { useSearch } from '@/shared/hooks/useSearch';
import { useToastContext } from '@/shared/context/ToastContext';
import ViewHeader from '@/shared/components/viewHeader/ViewHeader';
import Button from '@/shared/components/button/Button';
import CustomersTable from '../components/tables/CustomersTable';
import ModalCustomer from '../components/modal/ModalCustomer';

export default function CustomersView() {
    const toast = useToastContext();
    const {
        customers,
        create,
        update,
        remove,
        deactivateCustomer,
        reactivateCustomer,
    } = useCustomers();
    const { modalState, openModal, closeModal } = useModalState();
    const { action, item: client } = modalState;
    const { query, setQuery, filtered } = useSearch(customers, 'name');

    const handleCreate = async (data) => {
        await create(data);
        toast.success('Cliente agregado correctamente.');
    };

    const handleUpdate = async (id, data) => {
        await update(id, data);
        toast.success('Cliente actualizado correctamente.');
    };

    const handleRemove = async (id) => {
        await remove(id);
        toast.success('Cliente eliminado.');
    };

    const handleDeactivate = async (id) => {
        const result = await deactivateCustomer(id);
        if (result.success) toast.success('Cliente desactivado.');
        else throw new Error(result.message);
    };

    const handleReactivate = async (id) => {
        const result = await reactivateCustomer(id);
        if (result.success) toast.success('Cliente reactivado.');
        else throw new Error(result.message);
    };

    return (
        <div className={styles.container}>
            <ViewHeader
                title="Clientes frecuentes"
                subtitle="Gestión de clientes recurrentes"
                query={query}
                onSearch={setQuery}
                action={
                    <Button
                        colorButton="#FF9800"
                        logoButton={Plus}
                        onClick={() => openModal('create', null)}
                    >
                        Añadir cliente
                    </Button>
                }
            />

            <CustomersTable customers={filtered} openModal={openModal} />

            {!action ? null : (
                <ModalCustomer
                    action={action}
                    customer={client}
                    onClose={closeModal}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleRemove}
                    onDeactivate={handleDeactivate}
                    onReactivate={handleReactivate}
                />
            )}
        </div>
    );
}
