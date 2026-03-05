import styles from './Modal.module.css';
import ProductForm from '@/features/inventory/components/form/ProductForm';

export default function Modal({ title, modalState, onClose, products }) {
    if (modalState.type === null) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* HEADER */}
                <header className={styles.header}>
                    <h2>{title}</h2>
                    <button onClick={onClose}>✕</button>
                </header>

                {/* BODY */}
                <div className={styles.body}>
                    {modalState.type === 'edit' && (
                        <ProductForm product={modalState.product} />
                    )}
                    {modalState.type === 'delete' &&
                        `Estas seguro de eliminar <${modalState.product.name}>`}
                </div>

                {/* FOOTER */}
                <footer className={styles.footer}>
                    <button onClick={onClose}>Cancelar</button>
                    <button>Guardar</button>
                </footer>
            </div>
        </div>
    );
}
