// ClientSection.jsx
// Requeridos: nombre, teléfono. Opcionales: NIT, dirección, medio de contacto.
import styles from './CustomersView.module.css';
import { Plus } from 'lucide-react';

import ViewHeader from '@/shared/components/viewHeader/ViewHeader';
import Button from '@/shared/components/button/Button';
import { useModalState } from '@/shared/hooks/useModalState';

import ModalCustomer from '@/features/customers/components/modal/ModalCustomer';
import CustomersTable from '@/features/customers/components/tables/CustomersTable';

export default function CustomersView() {
    const { modalState, openModal, closeModal } = useModalState();
    const { action, item: client } = modalState;

    return (
        <div className={styles.section}>
            <ViewHeader
                title="Añade un cliente"
                subtitle="Complete los detalles a continuación para registrar un cliente recurrente"
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
            <CustomersTable />
            {!action ? null : <ModalCustomer onClose={closeModal} />}
        </div>
    );
}
