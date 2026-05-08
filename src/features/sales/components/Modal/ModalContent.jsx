import styles from './ModalContent.module.css';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';

import BodyModal from './BodoyModal/BodyModal';

export default function ModalContent({ sale, onClose }) {
    // Bloqueamos el scroll del fondo cuando el modal está abierto
    useBodyScrollLock(true);
    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${styles.modalForm}`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    title={`Venta No.${sale.id} - Realizada el ${new Date(
                        sale.created_at,
                    ).toLocaleDateString('es-GT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}`}
                    subTitle={`Se realizo a las ${new Date(
                        sale.created_at,
                    ).toLocaleTimeString('es-GT', {
                        hour: 'numeric',
                        minute: '2-digit',
                    })}`}
                    variant="default"
                    onClose={onClose}
                />
                <div className={styles.body}>
                    <BodyModal sale={sale} />
                </div>
            </div>
        </div>
    );
}
