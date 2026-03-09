import styles from './MaterialsControlled.module.css';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import Button from '@/shared/components/button/Button';
import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';
import MaterialsTable from '../tables/MaterialsTable';
import Modal from '@/shared/components/modal/Modal';

export default function MaterialsControlled({ products, create }) {
    const [modalState, setModalState] = useState({ type: null, product: null });

    const handleClickClose = () => {
        setModalState({
            type: null,
            product: null,
        });
    };

    const openModal = (type, product) => {
        setModalState({
            type,
            product,
        });
    };

    return (
        <div className={styles.container__main}>
            <HeadTitleTable
                title={'Inventario de materiales controlados'}
                subtitle={'Materias primas y componentes'}
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

            <MaterialsTable openModal={openModal} products={products} />

            <Modal
                onClose={handleClickClose}
                modalState={modalState}
                create={create}
            />
        </div>
    );
}
