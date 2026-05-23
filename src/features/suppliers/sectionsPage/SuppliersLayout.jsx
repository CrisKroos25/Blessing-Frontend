import { useState } from 'react';
import styles from './SuppliersLayout.module.css';
import { useSuppliers } from '@/features/suppliers/hooks/useSuppliers';
import SuppliersTabs from '../components/tabs/SuppliersTabs';
import SuppliersPlacesView from '../views/SuppliersPlacesView';
import PlacesView from '../views/PlacesView';

export default function SuppliersLayout() {
    const [view, setView] = useState('suppliers');

    const {
        suppliers, places, isLoading,
        createSupplier, updateSupplier, deactivateSupplier, reactivateSupplier, deleteSupplier,
        createPlace,    updatePlace,    deactivatePlace,    reactivatePlace,    deletePlace,
    } = useSuppliers();

    return (
        <div className={styles.container__main}>
            <SuppliersTabs view={view} setView={setView} />

            {view === 'suppliers' && (
                <SuppliersPlacesView
                    suppliers={suppliers}
                    isLoading={isLoading}
                    createSupplier={createSupplier}
                    updateSupplier={updateSupplier}
                    deactivateSupplier={deactivateSupplier}
                    reactivateSupplier={reactivateSupplier}
                    deleteSupplier={deleteSupplier}
                />
            )}

            {view === 'places' && (
                <PlacesView
                    places={places}
                    isLoading={isLoading}
                    createPlace={createPlace}
                    updatePlace={updatePlace}
                    deactivatePlace={deactivatePlace}
                    reactivatePlace={reactivatePlace}
                    deletePlace={deletePlace}
                />
            )}
        </div>
    );
}