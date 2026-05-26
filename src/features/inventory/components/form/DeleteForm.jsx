// DeleteForm.jsx
// Cuerpo del modal cuando action === 'delete'
// Reemplaza el <p> inline que había en Modal.jsx

import styles from './DeleteForm.module.css';
import { Trash2, Save } from 'lucide-react';
import Button from '@/shared/components/button/Button';

export default function DeleteForm({
    productName,
    onClose,
    onConfirm,
    isSubmitting,
}) {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <Trash2 size={28} className={styles.icon} />
            </div>

            <div className={styles.text}>
                <h3 className={styles.title}>¿Eliminar producto?</h3>
                <p className={styles.description}>
                    ¿Eliminar el producto <b>{productName}</b> permanentemente?
                    Esta acción no se puede deshacer. <br />
                </p>
            </div>

            <div className={styles.actions}>
                <Button
                    className={styles.cancelButton}
                    children={'Cancelar'}
                    colorButton="transparent"
                    colorFont="#444"
                    style={{ border: '1px solid #ccc' }}
                    onClick={onClose}
                    disabled={isSubmitting}
                />

                <Button
                    className={styles.deleteButton}
                    colorButton="#e53935"
                    children={isSubmitting ? 'Eliminando...' : 'Eliminar'}
                    logoButton={Trash2}
                    onClick={onConfirm}
                    disabled={isSubmitting}
                />
            </div>
        </div>
    );
}
