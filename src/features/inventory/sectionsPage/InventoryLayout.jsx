// Componente contenedor del contenido principal del inventario.
// 1. Saber qué tab/vista está activa
// 2. Filtrar los productos según la vista activa
// 3. Renderizar la vista correcta con sus productos

import styles from './InventoryLayout.module.css';
import InventoryView from '../views/InventoryView';
import InventoryTabs from '../components/tabs/InventoryTabs';
import { useState } from 'react';

// Cada vista tiene su propia función de filtrado de productos.
const VIEW_FILTERS = {
    controlledMaterialsView: (p) => p.type === 'product',
    indirectMaterialsView: (p) => p.type === 'supply',
    finalProductsView: (p) => p.type === 'bundle',
};

export default function InventoryLayout({
    products,
    create,
    update,
    remove,
    loading,
    error,
}) {
    const [view, setView] = useState('controlledMaterialsView'); // `view` guarda la key del tab activo.

    // Filtramos los productos usando la función del tab activo. Así cada vista solo recibe los productos que le pertenecen
    const filteredProducts = products.filter(VIEW_FILTERS[view]);

    return (
        <div className={styles.container__main}>
            {/* InventoryTabs recibe el tab activo y la función para cambiarlo cuando el usuario hace click */}
            <InventoryTabs view={view} setView={setView} />

            {/* view && evita un error si la key no existe en VIEW_COMPONENTS — renderiza solo si es válido */}
            {view === 'controlledMaterialsView' && (
                <InventoryView
                    title="Materiales controlados"
                    subtitle="Materias primas y componentes"
                    defaultType="product"
                    products={filteredProducts}
                    create={create}
                    update={update}
                    remove={remove}
                    loading={loading}
                    error={error}
                />
            )}
            {view === 'indirectMaterialsView' && (
                <InventoryView
                    title="Materiales indirectos"
                    subtitle="Insumos y materiales de uso general"
                    defaultType="supply"
                    products={filteredProducts}
                    create={create}
                    update={update}
                    remove={remove}
                    loading={loading}
                    error={error}
                />
            )}
            {view === 'finalProductsView' && (
                <InventoryView
                    title="Productos finales"
                    subtitle="Arreglos y productos ensamblados"
                    defaultType="bundle"
                    products={filteredProducts}
                    allProducts={products}
                    create={create}
                    update={update}
                    remove={remove}
                    loading={loading}
                    error={error}
                />
            )}
        </div>
    );
}
