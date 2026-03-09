import styles from './ContentMain.module.css';
import FinalProducts from '../views/FinalProducts';
import IndirectMaterials from '../views/IndirectMaterials';
import InventoryTabs from '../tabs/InventoryTabs';
import MaterialsControlled from '../views/MaterialsControlled';
import { useState } from 'react';

export default function ContentMain({ products, create }) {
    const [view, setView] = useState('materialsControlled');

    const componentsViews = {
        materialsControlled: MaterialsControlled,
        indirectMaterials: IndirectMaterials,
        finalProducts: FinalProducts,
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
