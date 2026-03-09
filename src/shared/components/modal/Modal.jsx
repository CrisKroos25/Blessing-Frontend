import styles from './Modal.module.css';
import BodyForm from '@/features/inventory/components/form/BodyForm';
import HeaderForm from '@/features/inventory/components/form/HeaderForm';
import FooterForm from '@/features/inventory/components/form/FooterForm';
import { useEffect } from 'react';
import { useProductForm } from '@/features/inventory/hooks/useProductForm';

export default function Modal({ modalState, onClose, create, update }) {
    const { type, product } = modalState;

    const { formData, handleChange } = useProductForm(product);

    useEffect(() => {
        document.body.style.overflow = type ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [type]);

    if (!type) return null;

    const handleSubmit = async () => {
        if (type === 'create') {
            await create(formData);
        }

        if (type === 'edit') {
            await update(product.id, formData);
        }

        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <HeaderForm
                    title={
                        type === 'create'
                            ? 'Añadir producto'
                            : 'Editar producto'
                    }
                    subTitle={product?.name ?? 'Complete los datos'}
                    onClose={onClose}
                />

                <div className={styles.body}>
                    {type !== 'delete' && (
                        <BodyForm
                            formData={formData}
                            handleChange={handleChange}
                        />
                    )}

                    {type === 'delete' && (
                        <p>
                            ¿Eliminar <b>{product.name}</b>?
                        </p>
                    )}
                </div>

                <FooterForm
                    onClose={onClose}
                    onSubmit={handleSubmit}
                    type={type}
                />
            </div>
        </div>
    );
}
