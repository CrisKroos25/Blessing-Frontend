// Componente contenedor del contenido principal del inventario.
// 1. Saber qué tab/vista está activ 2. Filtrar los productos según la vista activa 3. Renderizar la vista correcta con sus productos

import styles from './InventoryLayout.module.css';
import ControlledMaterialsView from '../views/ControlledMaterialsView';
import IndirectMaterialsView from '../views/IndirectMaterialsView';
import FinalProductsView from '../views/FinalProductsView';
import InventoryTabs from '../components/tabs/InventoryTabs';
import { useState } from 'react';

// Cada vista tiene su propia función de filtrado de productos.
const VIEW_FILTERS = {
    controlledMaterialsView: (p) => p.type === 'Controlado',
    indirectMaterialsView: (p) => p.type === 'Insumos',
    finalProductsView: (p) => p.type === 'Finales',
};

// se renderiza dinámicamente el componente
const VIEW_COMPONENTS = {
    controlledMaterialsView: ControlledMaterialsView,
    indirectMaterialsView: IndirectMaterialsView,
    finalProductsView: FinalProductsView,
};

export default function InventoryLayout({ products, create, update, remove }) {
    const [view, setView] = useState('controlledMaterialsView'); // `view` guarda la key del tab activo.

    const CurrentView = VIEW_COMPONENTS[view]; // Obtenemos el componente que corresponde al tab activo

    // Filtramos los productos usando la función del tab activo. Así cada vista solo recibe los productos que le pertenecen
    const filteredProducts = products.filter(VIEW_FILTERS[view]);

    return (
        <div className={styles.container__main}>
            {/* InventoryTabs recibe el tab activo y la función para cambiarlo cuando el usuario hace click */}
            <InventoryTabs view={view} setView={setView} />

            {/* CurrentView && evita un error si la key no existe en VIEW_COMPONENTS — renderiza solo si es válido */}
            {CurrentView && (
                <CurrentView
                    products={filteredProducts} // Productos filtrados segun la vista.
                    allProducts={products} // Solo lo recibe FinalProducts.jsx
                    create={create}
                    update={update}
                    remove={remove}
                />
            )}
        </div>
    );
}
