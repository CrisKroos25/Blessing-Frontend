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

import styles from './ModalProducts.module.css';

import { useProductForm } from '@/features/inventory/hooks/useProductForm';
import { useProductValidation } from '@/features/inventory/hooks/useProductValidation';
import { useBundleMaterials } from '@/features/inventory/hooks/useBundleMaterials';
import { resolveInitialProduct } from '@/features/inventory/utils/productFormUtils';
import BodyForm from '@/features/inventory/components/form/BodyForm';
import FooterForm from '@/features/inventory/components/form/FooterForm';
import DeleteForm from '@/features/inventory/components/form/DeleteForm';
import ConfirmForm from '@/features/inventory/components/form/ConfirmForm';

import { useToastContext } from '@/shared/context/ToastContext';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';

import { useState } from 'react';

// Componente interno — se monta SOLO cuando el modal está abierto. Así useState siempre se inicializa con los valores correctos
export default function ModalProducts({
    action,
    product,
    defaultType,
    onClose,
    create,
    update,
    remove,
    deactivate,
    reactivate,
    allProducts,
}) {
    // Variables para titulo del formulario segun accion y tipo de producto
    const titles = {
        create: {
            bundle: 'Añadir un arreglo',
            supply: 'Añadir un insumo',
            product: 'Añadir un producto',
        },
        edit: 'Editar producto',
        deactivate: 'Desactivar producto',
        reactivate: 'Reactivar producto',
        delete: 'Eliminar producto',
    };

    const isConfirmAction = ['deactivate', 'reactivate', 'delete'].includes(
        action,
    );

    const { errors, validate, clearErrors } = useProductValidation();
    const toast = useToastContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialProduct = resolveInitialProduct(
        // Le pasa los datos limpios a formData para que sepa con que arrancar, dependiendo si es create o edit de producto o arreglo
        action,
        product,
        defaultType,
    );

    // useProductForm inicializa el formulario con los datos del producto
    const { formData, handleChange, resetForm } =
        useProductForm(initialProduct);

    // Cargar materials si es edit y bundle
    useBundleMaterials(action, product, handleChange);

    // Bloqueamos el scroll del fondo cuando el modal está abierto
    useBodyScrollLock(true);

    // Esta función se ejecuta al hacer click en "Guardar"
    const handleSubmit = async () => {
        // Validación solo para CREATE y EDIT, no para DELETE
        if ((action === 'create' || action === 'edit') && !validate(formData))
            return;

        setIsSubmitting(true); // ← bloquea el botón

        try {
            if (action === 'create') await create(formData);
            if (action === 'edit') await update(product.id, formData);
            if (action === 'delete') await remove(product.id);
            if (action === 'deactivate') await deactivate(product.id);
            if (action === 'reactivate') await reactivate(product.id);

            const messages = {
                create: `${formData.name} agregado exitosamente`,
                edit: `${formData.name} actualizado correctamente`,
                deactivate: `${product.name} desactivado`,
                reactivate: `${product.name} reactivado`,
                delete: `Producto eliminado`,
            };
            toast.success(messages[action]);

            clearErrors();
            resetForm();
            onClose();
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            toast.error(error?.message || 'Ocurrió un error, intenta de nuevo');
        } finally {
            setIsSubmitting(false); // ← desbloquea siempre, con éxito o error
        }
    };

    return (
        <div className={styles.overlay}>
            {/* stopPropagation evita que el click dentro del modal lo cierre */}
            <div
                className={`${styles.modal} ${
                    action === 'create' || action === 'edit'
                        ? styles.modalForm
                        : styles.modalDelete
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    title={
                        action === 'create'
                            ? titles.create[defaultType]
                            : titles[action]
                    }
                    subTitle={
                        action === 'create'
                            ? 'Complete los detalles a continuación para registrar un nuevo artículo en su inventario'
                            : action === 'delete'
                              ? 'Esta acción no se puede deshacer'
                              : product?.name
                    }
                    variant={action === 'delete' ? 'danger' : 'default'}
                    onClose={onClose}
                />
                <div className={styles.body}>
                    {!isConfirmAction && (
                        <BodyForm
                            action={action}
                            formData={formData}
                            handleChange={handleChange}
                            lockType={action === 'create'}
                            errors={errors}
                            allProducts={allProducts}
                        />
                    )}

                    {(action === 'deactivate' || action === 'reactivate') && (
                        <ConfirmForm
                            action={action}
                            productName={product.name}
                            onClose={onClose}
                            onConfirm={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    )}

                    {action === 'delete' && (
                        <DeleteForm
                            productName={product.name}
                            onClose={onClose}
                            onConfirm={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </div>

                {/* Footer solo para create y edit */}
                {!isConfirmAction && (
                    <FooterForm
                        onClose={onClose}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                )}
            </div>
        </div>
    );
}
