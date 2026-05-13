// features/settings/views/ConfigView.jsx

import styles from './ConfigView.module.css';
import CatalogSection from '@/features/settings/components/CatalogSection/CatalogSection';

import ViewHeader from '@/shared/components/viewHeader/ViewHeader';
import { useToastContext } from '@/shared/context/ToastContext';

export default function ConfigView({
    categories,
    units,
    addCategory,
    removeCategory,
    addUnit,
    removeUnit,
}) {
    const toast = useToastContext();

    // Filtra por tipo
    const productCategories = categories.filter(
        (c) => c.item_type === 'product',
    );
    const supplyCategories = categories.filter((c) => c.item_type === 'supply');

    // Wrappers con toast
    const handleAddCategory = async (name, item_type) => {
        try {
            await addCategory(name, item_type);
            toast.success(`Categoría "${name}" agregada.`);
        } catch (err) {
            toast.error(err.message || 'Error al agregar categoría.');
        }
    };

    const handleRemoveCategory = async (id) => {
        try {
            await removeCategory(id);
            toast.success('Categoría eliminada.');
        } catch (err) {
            toast.error(err.message || 'Error al eliminar categoría.');
        }
    };

    const handleAddUnit = async (name) => {
        try {
            await addUnit(name);
            toast.success(`Unidad "${name}" agregada.`);
        } catch (err) {
            toast.error(err.message || 'Error al agregar unidad.');
        }
    };

    const handleRemoveUnit = async (id) => {
        try {
            await removeUnit(id);
            toast.success('Unidad eliminada.');
        } catch (err) {
            toast.error(err.message || 'Error al eliminar unidad.');
        }
    };

    return (
        <div className={styles.container}>
            <ViewHeader
                title="Configuración"
                subtitle="Administra las categorías y unidades del inventario"
            />

            <div className={styles.layout}>
                {/* ── Columna izquierda: categorías ── */}
                <CatalogSection
                    title="CATEGORÍAS DE PRODUCTOS"
                    items={productCategories}
                    onAdd={(name) => handleAddCategory(name, 'product')}
                    onRemove={handleRemoveCategory}
                />
                <CatalogSection
                    title="CATEGORÍAS DE INSUMOS"
                    items={supplyCategories}
                    onAdd={(name) => handleAddCategory(name, 'supply')}
                    onRemove={handleRemoveCategory}
                />

                {/* ── Columna derecha: unidades ── */}
                <div className={styles.column}>
                    <CatalogSection
                        title="UNIDADES DE MEDIDA"
                        items={units}
                        onAdd={handleAddUnit}
                        onRemove={handleRemoveUnit}
                    />
                </div>
            </div>
        </div>
    );
}
