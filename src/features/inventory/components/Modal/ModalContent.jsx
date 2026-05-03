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
import { useBundleMaterials } from '@/features/inventory/hooks/useBundleMaterials';
import { resolveInitialProduct } from '@/features/inventory/utils/productFormUtils';
import { useToastContext } from '@/shared/context/ToastContext';
import { useState } from 'react';
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
    // Variables para titulo del formulario segun accion y tipo de producto
    const titles = {
        create: {
            bundle: 'Añadir un arreglo',
            supply: 'Añadir un insumo',
            product: 'Añadir un producto',
        },
        edit: 'Editar producto',
        delete: 'Eliminar producto',
    };

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
        if (action !== 'delete' && !validate(formData)) return;

        setIsSubmitting(true); // ← bloquea el botón

        try {
            if (action === 'create') {
                await create(formData);
            }
            if (action === 'edit') {
                await update(product.id, formData);
            }
            if (action === 'delete') {
                await remove(product.id);
            }

            const messages = {
                create: `${formData.name} agregado exitosamente`,
                edit: `${formData.name} actualizado correctamente`,
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
            console.log(formData);
        }
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
                            ? titles.create[defaultType]
                            : titles[action]
                    }
                    subTitle={
                        action === 'create'
                            ? 'Complete los detalles a continuación para registrar un nuevo artículo en su inventario'
                            : product?.name
                    }
                    action={action}
                    onClose={onClose}
                />

                <div className={styles.body}>
                    {/* Mostramos el formulario para crear o editar */}
                    {action !== 'delete' && (
                        <BodyForm
                            action={action}
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
