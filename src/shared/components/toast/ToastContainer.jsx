// shared/components/toast/ToastContainer.jsx
// ============================================================
// Renderiza todos los toasts activos en la esquina
// inferior derecha. Vive en App.jsx para estar siempre visible.
// ============================================================

import styles from './ToastContainer.module.css';
import { X, CircleCheck, CircleAlert, TriangleAlert } from 'lucide-react';

// Ícono y color según el tipo de toast
const TOAST_CONFIG = {
    success: { icon: CircleCheck, className: styles.success },
    error: { icon: CircleAlert, className: styles.error },
    warning: { icon: TriangleAlert, className: styles.warning },
};

export default function ToastContainer({ toasts, onDismiss }) {
    return (
        <div className={styles.container}>
            {toasts.map((toast) => {
                const { icon: Icon, className } =
                    TOAST_CONFIG[toast.type] ?? TOAST_CONFIG.success;

                return (
                    <div
                        key={toast.id}
                        className={`${styles.toast} ${className}`}
                    >
                        <Icon size={18} className={styles.icon} />
                        <span className={styles.message}>{toast.message}</span>
                        <button
                            className={styles.dismiss}
                            onClick={() => onDismiss(toast.id)}
                        >
                            <X size={14} />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
