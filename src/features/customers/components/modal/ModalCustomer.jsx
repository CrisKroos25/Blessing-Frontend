import styles from './ModalCustomer.module.css';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';

export default function ModalCustomer({ onClose }) {
    // Bloqueamos el scroll del fondo cuando el modal está abierto
    useBodyScrollLock(true);
    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${styles.modalForm}`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    title="Agregar cliente"
                    subTitle="Complete los detalles a continuación para registrar un cliente recurrente"
                    variant="default"
                    onClose={onClose}
                />
                <div className={styles.body}></div>
            </div>
        </div>
    );
}
