import styles from './HeaderForm.module.css';
import { X, SquarePen } from 'lucide-react';

export default function HeaderForm({ title, subTitle, onClose }) {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header_title}>
                    <div className={styles.content_icon}>
                        <div className={styles.icon}>
                            <SquarePen size={25} />
                        </div>
                        <div className={styles.description}>
                            <h2>{title}</h2>
                            <div>{subTitle}</div>
                        </div>
                    </div>
                    <button className={styles.button} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
            </header>
        </>
    );
}
