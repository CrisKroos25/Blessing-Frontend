// HeaderForm.jsx
// Ahora recibe un `icon` como prop para que cada módulo
// pueda pasar su propio ícono sin tocar el componente.

import styles from './HeaderForm.module.css';
import { X, SquarePen } from 'lucide-react';

export default function HeaderForm({
    title,
    subTitle,
    onClose,
    icon: Icon = SquarePen,
    type = 'default',
}) {
    const headerStyle =
        type === 'delete' ? styles.headerDelete : styles.headerDefault;
    const iconStyle =
        type === 'delete' ? styles.iconDelete : styles.iconDefault;

    return (
        <header className={`${styles.header} ${headerStyle}`}>
            <div className={styles.header_title}>
                <div className={styles.content_icon}>
                    <div className={`${styles.icon} ${iconStyle}`}>
                        <Icon size={25} />
                    </div>
                    <div className={styles.description}>
                        <h2 className={styles.title}>{title}</h2>
                        {subTitle && (
                            <div className={styles.subtitle}>{subTitle}</div>
                        )}
                    </div>
                </div>
                <button className={styles.button} onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
        </header>
    );
}
