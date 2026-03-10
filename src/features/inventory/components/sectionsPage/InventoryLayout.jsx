import styles from './InventoryLayout.module.css';
import ControlledMaterialsView from '../../views/ControlledMaterialsView';
import IndirectMaterialsView from '@/features/inventory/views/IndirectMaterialsView';
import FinalProductsView from '../../views/FinalProductsView';
import InventoryTabs from '../tabs/InventoryTabs';
import { useState } from 'react';

export default function InventoryLayout({ products, create }) {
    const [view, setView] = useState('controlledMaterialsView');

    const componentsViews = {
        controlledMaterialsView: ControlledMaterialsView,
        indirectMaterialsView: IndirectMaterialsView,
        finalProductsView: FinalProductsView,
    };

    const CurrentView = componentsViews[view];

    return (
        <div className={styles.container__main}>
            <InventoryTabs view={view} setView={setView} />

            <div>
                {CurrentView && (
                    <CurrentView products={products} create={create} />
                )}
            </div>
        </div>
    );
}
