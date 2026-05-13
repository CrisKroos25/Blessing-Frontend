import styles from './ModalContent.module.css';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';
import BodyModal from './BodyModal/BodyModal';

export default function ModalContent({ purchase, onClose }) {
    useBodyScrollLock(true);

    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${styles.modalForm}`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    title={`Compra No.${purchase.id} - Realizada el ${new Date(
                        purchase.date,
                    ).toLocaleDateString('es-GT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}`}
                    subTitle={`${purchase.supplier?.name || purchase.place?.name || 'Sin origen registrado'}`}
                    variant="default"
                    onClose={onClose}
                />
                <div className={styles.body}>
                    <BodyModal purchase={purchase} />
                </div>
            </div>
        </div>
    );
}