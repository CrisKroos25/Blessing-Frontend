import styles from './InventoryTabs.module.css';
import Button from '@/shared/components/button/Button';

export default function InventoryTabs({ view, setView }) {
    const tabs = [
        { key: 'materialsControlled', label: 'Materiales controlados' },
        { key: 'indirectMaterials', label: 'Materiales indirectos' },
        { key: 'finalProducts', label: 'Productos finales' },
    ];

    return (
        <div className={styles.container__buttons}>
            {tabs.map((tab) => (
                <Button
                    key={tab.key}
                    children={tab.label}
                    colorButton={view === tab.key ? '#e91e63' : 'transparent'}
                    colorFont={view === tab.key ? 'white' : 'rgb(65, 65, 65)'}
                    sizeButton="215px"
                    onClick={() => setView(tab.key)}
                />
            ))}
        </div>
    );
}
