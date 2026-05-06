import { useState } from 'react';
import styles from './PurchasesLayout.module.css';
import PurchasesTabs from '../components/tabs/PurchasesTabs';
import NewPurchaseView from '../views/NewPurchaseView';
import PurchaseRecordView from '../views/PurchaseRecordView';
import SuppliersPlacesView from '../views/SuppliersPlacesView';

const VIEW_COMPONENTS = {
    newPurchaseView:     NewPurchaseView,
    purchaseRecordView:  PurchaseRecordView,
    suppliersPlacesView: SuppliersPlacesView,
};

export default function PurchasesLayout() {
    const [view, setView] = useState('newPurchaseView');
    const CurrentView = VIEW_COMPONENTS[view];

    return (
        <div className={styles.container__main}>
            <PurchasesTabs view={view} setView={setView} />
            {CurrentView && <CurrentView />}
        </div>
    );
}
