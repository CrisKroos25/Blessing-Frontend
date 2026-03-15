// ============================================================
// Modal.jsx
// ------------------------------------------------------------
// Este componente muestra el modal con el formulario.
// Recibe desde afuera:
//   - modalState: { type, product } → sabe qué mostrar
//   - onClose:    función para cerrarse
//   - create:     función para crear un producto nuevo
//   - update:     función para editar un producto existente
// ============================================================

import styles from './Modal.module.css';
import { useProductForm } from '@/features/inventory/hooks/useProductForm';
import BodyForm from '@/features/inventory/components/form/BodyForm';
import HeaderForm from '@/features/inventory/components/form/HeaderForm';
import FooterForm from '@/features/inventory/components/form/FooterForm';
import DeleteForm from '@/features/inventory/components/form/DeleteForm';

// Importamos el hook que bloquea el scroll del fondo
import { useBodyScrollLock } from '@/features/inventory/hooks/useBodyScroll';

export default function Modal({ modalState, onClose, create, update, remove }) {
    const { type, product } = modalState;

    // useProductForm inicializa el formulario con los datos del producto
    // (si es "create", arranca vacío; si es "edit", arranca con los datos del producto)
    const { formData, handleChange, resetForm } = useProductForm(product);

    // Bloqueamos el scroll del fondo cuando el modal está abierto
    useBodyScrollLock(!!type);

    // Si no hay tipo, el modal está cerrado → no renderizamos nada
    if (!type) return null;

    // Esta función se ejecuta al hacer click en "Guardar"
    const handleSubmit = async () => {
        if (type === 'create') {
            await create(formData);
        }

        if (type === 'edit') {
            await update(product.id, formData);
        }
        if (type === 'delete') {
            await remove(product.id, formData);
        }

        resetForm(); // ← limpia antes de cerrar
        // Después de guardar, cerramos el modal
        onClose();
    };

    return (
        // El overlay oscuro del fondo → si hacen click afuera, se cierra
        <div className={styles.overlay} onClick={onClose}>
            {/* stopPropagation evita que el click dentro del modal lo cierre */}
            <div
                className={`${styles.modal} ${
                    type === 'delete' ? styles.modalDelete : styles.modalForm
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderForm
                    title={
                        type === 'create'
                            ? 'Añadir producto'
                            : type === 'edit'
                              ? 'Editar producto'
                              : 'Eliminar producto'
                    }
                    subTitle={
                        type === 'create'
                            ? 'Complete los detalles a continuación para registrar un nuevo artículo en su inventario'
                            : (product?.name ?? null)
                    }
                    type={type}
                    onClose={onClose}
                />

                <div className={styles.body}>
                    {/* Mostramos el formulario para crear o editar */}
                    {type !== 'delete' && (
                        <BodyForm
                            formData={formData}
                            handleChange={handleChange}
                        />
                    )}

                    {/* Mostramos confirmación para eliminar */}
                    {type === 'delete' && (
                        <DeleteForm
                            productName={product.name}
                            onClose={onClose}
                            onConfirm={handleSubmit}
                        />
                    )}
                </div>

                {/* Footer solo para crear y editar, DeleteForm tiene sus propios botones */}
                {type !== 'delete' && (
                    <FooterForm onClose={onClose} onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
}
