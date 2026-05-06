import styles from './Header.module.css';
import { Bell, Search } from 'lucide-react';
import '..//shared/styles/fonts.css';
import Button from '../shared/components/button/Button';

export default function Header({
    title,
    placeH,
    textButton,
    buttonColor,
    sizeButton = '180px',
    logoButtona,
}) {
    return (
        <header className={styles.header}>
            <div className={styles.container_main}>
                <div className={styles.left}>
                    <h1 className={styles.title}>{title}</h1>
                </div>

                <div className={styles.right}>
                    <button className={styles.notification}>{<Bell />}</button>
                </div>
            </div>
        </header>
    );
}
