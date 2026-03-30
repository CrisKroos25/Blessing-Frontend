// ============================================================
// ModalContent.jsx
// ------------------------------------------------------------
// Este componente muestra el modal con el formulario.
// Recibe desde afuera:
//   - modalState://    - action:  'create' | 'edit' | 'delete'
//                      - product: producto seleccionado (null si es create)
//   - onClose:    función para cerrarse
//   - Funciones:   create, update, remove
// ============================================================

import styles from './ModalContent.module.css';
import { useProductForm } from '@/features/inventory/hooks/useProductForm';
import { useProductValidation } from '@/features/inventory/hooks/useProductValidation';
import { useBodyScrollLock } from '@/features/inventory/hooks/useBodyScroll';
import { resolveInitialProduct } from '@/features/inventory/utils/productFormUtils';
import BodyForm from '@/features/inventory/components/form/BodyForm';
import HeaderForm from '@/features/inventory/components/form/HeaderForm';
import FooterForm from '@/features/inventory/components/form/FooterForm';
import DeleteForm from '@/features/inventory/components/form/DeleteForm';

// Componente interno — se monta SOLO cuando el modal está abierto. Así useState siempre se inicializa con los valores correctos
export default function ModalContent({
    action,
    product,
    defaultType,
    onClose,
    create,
    update,
    remove,
    allProducts,
}) {
    const { errors, validate, clearErrors } = useProductValidation();

    const initialProduct = resolveInitialProduct(
        // Le pasa los datos limpios a formData para que sepa con que arrancar, dependiendo si es create o edit de producto o arreglo
        action,
        product,
        defaultType,
        allProducts,
    );

    // useProductForm inicializa el formulario con los datos del producto
    const { formData, handleChange, resetForm } =
        useProductForm(initialProduct);

    // Bloqueamos el scroll del fondo cuando el modal está abierto
    useBodyScrollLock(true);

    // Esta función se ejecuta al hacer click en "Guardar"
    const handleSubmit = async () => {
        if (!validate(formData)) return; // ← se detiene si hay errores

        if (action === 'create') {
            await create(formData);
        }
        if (action === 'edit') {
            await update(product.id, formData);
        }
        if (action === 'delete') {
            await remove(product.id);
        }

        clearErrors();
        resetForm();
        onClose();
    };

    return (
        <div className={styles.overlay}>
            {/* stopPropagation evita que el click dentro del modal lo cierre */}
            <div
                className={`${styles.modal} ${
                    action === 'delete' ? styles.modalDelete : styles.modalForm
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderForm
                    title={
                        action === 'create'
                            ? 'Añadir producto'
                            : action === 'edit'
                              ? 'Editar producto'
                              : 'Eliminar producto'
                    }
                    subTitle={
                        action === 'create'
                            ? 'Complete los detalles a continuación para registrar un nuevo artículo en su inventario'
                            : (product?.name ?? null)
                    }
                    action={action}
                    onClose={onClose}
                />

                <div className={styles.body}>
                    {/* Mostramos el formulario para crear o editar */}
                    {action !== 'delete' && (
                        <BodyForm
                            formData={formData}
                            handleChange={handleChange}
                            lockType={action === 'create'}
                            errors={errors}
                            allProducts={allProducts}
                        />
                    )}

                    {/* Mostramos confirmación para eliminar */}
                    {action === 'delete' && (
                        <DeleteForm
                            productName={product.name}
                            onClose={onClose}
                            onConfirm={handleSubmit}
                        />
                    )}
                </div>

                {/* Footer solo para crear y editar, DeleteForm tiene sus propios botones */}
                {action !== 'delete' && (
                    <FooterForm onClose={onClose} onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
}
