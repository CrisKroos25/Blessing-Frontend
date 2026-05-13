// ============================================================
// InventorySection.jsx
// ------------------------------------------------------------
// Sección 2 del formulario: datos de inventario.
// Contiene: stock actual, stock mínimo, unidad de medida
// y clasificación del material (controlado o insumo).
// ============================================================
// features/inventory/components/form/sectionsBody/InventorySection.jsx

import styles from './InventorySection.module.css';
import Input from '@/shared/components/input/Input';
import { CircleAlert } from 'lucide-react';

export default function InventorySection({
    formData,
    handleChange,
    errors = {},
    categories = [], // ← viene de afuera, ya filtradas por tipo
    units = [], // ← viene de afuera
}) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>2</div>
                <div className={styles.sectionTitle}>Inventario</div>
            </div>

            {/* Fila 1: Categoría y unidad */}
            <div className={styles.gridThree}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        CATEGORÍA <span className={styles.required}>*</span>
                    </label>
                    <select
                        name="category"
                        className={styles.select}
                        value={formData.category || ''}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecciona una categoría...
                        </option>
                        {categories.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <span className={styles.errorText}>
                            <CircleAlert size={12} /> {errors.category}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        UNIDAD DE MEDIDA{' '}
                        <span className={styles.required}>*</span>
                    </label>
                    <select
                        name="unit"
                        className={styles.select}
                        value={formData.unit || ''}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecciona una unidad...
                        </option>
                        {units.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    {errors.unit && (
                        <span className={styles.errorText}>
                            <CircleAlert size={12} /> {errors.unit}
                        </span>
                    )}
                </div>
            </div>

            {/* Fila 2: Stock */}
            <div className={styles.gridThree}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        STOCK ACTUAL <span className={styles.required}>*</span>
                    </label>
                    <Input
                        name="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="0"
                    />
                    {errors.stock && (
                        <span className={styles.errorText}>
                            <CircleAlert size={12} /> {errors.stock}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        STOCK MÍNIMO <span className={styles.required}>*</span>
                    </label>
                    <Input
                        name="min_stock"
                        type="number"
                        min="0"
                        value={formData.min_stock}
                        onChange={handleChange}
                        placeholder="0"
                    />
                    {errors.min_stock && (
                        <span className={styles.errorText}>
                            <CircleAlert size={12} /> {errors.min_stock}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}
