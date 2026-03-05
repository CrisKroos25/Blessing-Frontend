import styles from './MaterialsControlled.module.css';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import Button from '@/shared/components/button/Button';
import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';
import MaterialsTable from '../tables/MaterialsTable';
import Modal from '@/shared/components/modal/Modal';

export default function MaterialsControlled({ products }) {
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
                    <Button colorButton="#FF9800" logoButton={Plus}>
                        Agregar producto
                    </Button>
                }
            />

            <MaterialsTable openModal={openModal} products={products} />

            <Modal
                title={'Ventana modal'}
                children={'Hola mundo'}
                onClose={handleClickClose}
                modalState={modalState}
            />
        </div>
    );
}
