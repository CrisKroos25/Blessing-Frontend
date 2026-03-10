// DeleteForm.jsx
// Cuerpo del modal cuando type === 'delete'
// Reemplaza el <p> inline que había en Modal.jsx

import styles from './DeleteForm.module.css';
import { Trash2 } from 'lucide-react';

export default function DeleteForm({ productName, onClose, onConfirm }) {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <Trash2 size={28} className={styles.icon} />
            </div>

            <div className={styles.text}>
                <h3 className={styles.title}>¿Eliminar producto?</h3>
                <p className={styles.description}>
                    Estás a punto de eliminar <b>{productName}</b>.<br />
                    Esta acción no se puede deshacer.
                </p>
            </div>

            <div className={styles.actions}>
                <button className={styles.cancelButton} onClick={onClose}>
                    Cancelar
                </button>
                <button className={styles.deleteButton} onClick={onConfirm}>
                    <Trash2 size={16} />
                    Eliminar
                </button>
            </div>
        </div>
    );
}
