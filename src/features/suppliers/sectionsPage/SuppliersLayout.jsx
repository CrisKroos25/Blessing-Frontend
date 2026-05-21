import styles from './SuppliersLayout.module.css';
import SuppliersPlacesView from '@/features/suppliers/views/SuppliersPlacesView';

export default function SuppliersLayout() {
    return (
        <div className={styles.containerMain}>
            <SuppliersPlacesView />
        </div>
    );
}
