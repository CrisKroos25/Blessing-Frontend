import styles from './SalesTabs.module.css';
import Button from '@/shared/components/button/Button';

export default function SalesTabs({ view, setView }) {
    const TABS = [
        { key: 'salesIncomeView', label: 'Nueva venta' },
        { key: 'salesRecordView', label: 'Registro de ventas' },
    ];

    return (
        <div className={styles.container__buttons}>
            {TABS.map((tab) => (
                <Button
                    key={tab.key}
                    children={tab.label}
                    colorButton={
                        view === tab.key
                            ? 'var(--primary-color)'
                            : 'transparent'
                    }
                    colorFont={view === tab.key ? 'white' : 'rgb(65, 65, 65)'}
                    sizeButton="215px"
                    onClick={() => setView(tab.key)}
                />
            ))}
        </div>
    );
}
