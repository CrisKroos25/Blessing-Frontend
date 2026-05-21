import styles from './PurchasesTabs.module.css';
import Button from '@/shared/components/button/Button';

export default function PurchasesTabs({ view, setView }) {
    const TABS = [
        { key: 'newPurchaseView',      label: 'Nueva compra' },
        { key: 'purchaseRecordView',   label: 'Historial' },
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
