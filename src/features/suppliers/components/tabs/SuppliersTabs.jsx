import styles from './SuppliersTabs.module.css';
import Button from '@/shared/components/button/Button';

export default function SuppliersTabs({ view, setView }) {
    const TABS = [
        { key: 'suppliers', label: 'Proveedores' },
        { key: 'places',    label: 'Lugares de compra' },
    ];

    return (
        <div className={styles.container__buttons}>
            {TABS.map((tab) => (
                <Button
                    key={tab.key}
                    colorButton={view === tab.key ? 'var(--primary-color)' : 'transparent'}
                    colorFont={view === tab.key ? 'white' : 'rgb(65, 65, 65)'}
                    sizeButton="215px"
                    onClick={() => setView(tab.key)}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
}