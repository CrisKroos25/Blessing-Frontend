// InventoryPage.jsx
import { PackageOpen, RefreshCw } from 'lucide-react';
import styles from './InventoryPage.module.css';
import { useProducts } from '../hooks/useProducts';
import InventoryLayout from '../sectionsPage/InventoryLayout';
import InventoryCards from '../sectionsPage/InventoryCards';

export default function InventoryPage() {
    const { products, loading, error, create, update, remove } = useProducts();

    // Cargando — muestra spinner
    if (loading) {
        return (
            <div className={styles.center}>
                <RefreshCw size={28} className={styles.spinner} />
                <span>Cargando inventario...</span>
            </div>
        );
    }

    // Error de carga — muestra mensaje
    if (error) {
        return (
            <div className={styles.center}>
                <PackageOpen size={28} />
                <span>No se pudo cargar el inventario</span>
                <small>{error}</small>
            </div>
        );
    }

    // Todo bien — renderiza normal
    return (
        <>
            <InventoryCards products={products} />
            <InventoryLayout
                products={products}
                create={create}
                update={update}
                remove={remove}
            />
        </>
    );
}
