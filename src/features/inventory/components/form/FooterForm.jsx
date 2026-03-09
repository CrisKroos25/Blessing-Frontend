import styles from './FooterForm.module.css';
import Button from '@/shared/components/button/Button';
import { Save } from 'lucide-react';

export default function FooterForm({ onClose, onSubmit }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.typeSubtitle}>
                Campos obligatorios
                <span className={styles.required}> *</span>
            </div>

            <div className={styles.content_button}>
                <Button
                    children={'Cancelar'}
                    colorButton="transparent"
                    colorFont="#444"
                    style={{ border: '1px solid #ccc' }}
                    onClick={onClose}
                />

                <Button
                    children={'Guardar'}
                    logoButton={Save}
                    onClick={onSubmit}
                />
            </div>
        </footer>
    );
}
