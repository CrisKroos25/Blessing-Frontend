import styles from './CustomerLayout.module.css';
import CustomersView from '@/features/customers/views/CustomersView';
export default function CustomerLayout() {
    return (
        <div className={styles.containerMain}>
            <CustomersView />
        </div>
    );
}
