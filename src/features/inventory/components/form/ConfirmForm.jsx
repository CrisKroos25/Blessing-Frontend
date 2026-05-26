// features/inventory/components/form/ConfirmForm.jsx

import styles from './ConfirmForm.module.css';
import { PowerOff, Power } from 'lucide-react';
import Button from '@/shared/components/button/Button';

const CONFIG = {
    deactivate: {
        icon: PowerOff,
        title: '¿Desactivar producto?',
        description: (name) => (
            <>
                Estás a punto de desactivar <b>{name}</b>. Dejará de aparecer en
                ventas pero se conservará el historial.
            </>
        ),
        btnLabel: 'Desactivar',
        btnColor: '#FF9800',
    },
    reactivate: {
        icon: Power,
        title: '¿Reactivar producto?',
        description: (name) => (
            <>
                Estás a punto de reactivar <b>{name}</b>. Volverá a estar
                disponible para nuevas ventas.
            </>
        ),
        btnLabel: 'Reactivar',
        btnColor: '#4CAF50',
    },
};

export default function ConfirmForm({
    action,
    productName,
    onClose,
    onConfirm,
    isSubmitting,
}) {
    const {
        icon: Icon,
        title,
        description,
        btnLabel,
        btnColor,
    } = CONFIG[action];

    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <Icon size={28} className={styles.icon} />
            </div>

            <div className={styles.text}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description(productName)}</p>
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.cancelButton}
                    colorButton="transparent"
                    colorFont="#444"
                    style={{ border: '1px solid #ccc' }}
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button
                    className={styles.deleteButton}
                    colorButton={btnColor}
                    logoButton={Icon}
                    onClick={onConfirm}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? `${btnLabel.slice(0, -2)}ando...`
                        : btnLabel}
                </Button>
            </div>
        </div>
    );
}
