// Componente contenedor del contenido principal del ventas.

import styles from './SalesLayout.module.css';
import SalesIncomeView from '../views/SalesIncomeView';
import SalesRecordView from '../views/SalesRecordView';
import SalesTabs from '../components/tabs/SalesTabs';
import { useState } from 'react';

// se renderiza dinámicamente el componente
const VIEW_COMPONENTS = {
    salesIncomeView: SalesIncomeView,
    salesRecordView: SalesRecordView,
};

export default function SalesLayout({
    products,
    sales,
    createSale,
    loading,
    error,
}) {
    const [view, setView] = useState('salesIncomeView'); // `view` guarda la key del tab activo.

    const CurrentView = VIEW_COMPONENTS[view]; // Obtenemos el componente que corresponde al tab activo

    return (
        <div className={styles.container__main}>
            {/* InventoryTabs recibe el tab activo y la función para cambiarlo cuando el usuario hace click */}
            <SalesTabs view={view} setView={setView} />

            {/* CurrentView && evita un error si la key no existe en VIEW_COMPONENTS — renderiza solo si es válido */}
            {view === 'salesIncomeView' && (
                <CurrentView
                    products={products}
                    createSale={createSale}
                    loading={loading}
                    error={error}
                />
            )}
            {view === 'salesRecordView' && (
                <CurrentView sales={sales} loading={loading} error={error} />
            )}
        </div>
    );
}
