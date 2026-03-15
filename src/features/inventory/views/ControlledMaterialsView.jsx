// ============================================================
// MaterialsControlled.jsx
// ------------------------------------------------------------
// Este componente es el "director de orquesta" de esta sección.
// Su única responsabilidad es:
//   1. Saber si el Modal está abierto o cerrado (y qué tipo)
//   2. Mostrar la tabla de materiales
//   3. Pasar las acciones correctas al Modal
// ============================================================

import styles from './ControlledMaterialsView.module.css';
import { Plus } from 'lucide-react';

import Button from '@/shared/components/button/Button';
import HeadTitleTable from '@/shared/components/titleTable/HeadTitleTable';
import MaterialsTable from '../components/tables/MaterialsTable';
import Modal from '@/shared/components/modal/Modal';

// Importamos el hook que maneja el estado del modal
import { useModalState } from '../hooks/useModalState';

export default function ControlledMaterialsView({
    products,
    create,
    update,
    remove,
}) {
    // useModalState se encarga de todo lo relacionado al modal:
    // abrir, cerrar, y saber qué tipo de acción se está haciendo
    const { modalState, openModal, closeModal } = useModalState();

    return (
        <div className={styles.container__main}>
            <HeadTitleTable
                title="Inventario de materiales controlados"
                subtitle="Materias primas y componentes"
                action={
                    // Al hacer click, abrimos el modal en modo "create"
                    // sin ningún producto seleccionado (null)
                    <Button
                        onClick={() => openModal('create', null)}
                        colorButton="#FF9800"
                        logoButton={Plus}
                    >
                        Agregar producto
                    </Button>
                }
            />
            {/* La tabla recibe openModal para que cada fila
                pueda abrir el modal en modo "edit" o "delete" */}
            <MaterialsTable products={products} openModal={openModal} />
            {/* El Modal recibe todo lo que necesita para funcionar */}
            <Modal
                key={modalState.product?.id ?? 'create'} // ← esto es todo lo que necesitas
                modalState={modalState}
                onClose={closeModal}
                create={create}
                update={update}
                remove={remove}
            />
        </div>
    );
}
