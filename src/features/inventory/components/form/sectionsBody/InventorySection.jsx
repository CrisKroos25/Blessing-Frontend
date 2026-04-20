// ============================================================
// InventorySection.jsx
// ------------------------------------------------------------
// Sección 2 del formulario: datos de inventario.
// Contiene: stock actual, stock mínimo, unidad de medida
// y clasificación del material (controlado o insumo).
// ============================================================

import styles from './InventorySection.module.css';
import Input from '@/shared/components/input/Input';
import { ShieldAlert, Package, CircleAlert } from 'lucide-react';

// Opciones para el selector de unidades de medida
const UNIT_OPTIONS = [
    { value: 'pcs', label: 'Piezas (pcs)' },
    { value: 'kg', label: 'Kilogramos (kg)' },
    { value: 'g', label: 'Gramos (g)' },
    { value: 'l', label: 'Litros (l)' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'm', label: 'Metros (m)' },
];

const CATEGORY_OPTIONS = [
    { value: 'Peluches', label: 'Peluches' },
    { value: 'Arreglos', label: 'Arreglos finales' },
    { value: 'Cintas', label: 'Cintas' },
    { value: 'Cajas', label: 'Cajas de regalo' },
    { value: 'Decoracion', label: 'Piezas de decoracion' },
    { value: 'Papel', label: 'Papel' },
];

export default function InventorySection({
    formData,
    handleChange,
    errors = {},
}) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>2</div>
                <div className={styles.sectionTitle}>Inventario</div>
            </div>

            <div className={styles.gridThree}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        CATEGORÍA <span className={styles.required}>*</span>
                    </label>
                    <select
                        name="category"
                        className={styles.select}
                        value={
                            formData.type === 'bundle'
                                ? 'Arreglos'
                                : formData.category
                        }
                        onChange={handleChange}
                        disabled={formData.type === 'bundle'}
                    >
                        <option value="" disabled>
                            Selecciona una categoría...
                        </option>
                        {CATEGORY_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
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
                    {/* Select nativo — simple y accesible */}
                    <select
                        name="unit"
                        className={styles.select}
                        value={formData.unit}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecciona una unidad...
                        </option>
                        {UNIT_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.unit && (
                        <span className={styles.errorText}>
                            {<CircleAlert size={12} />}
                            {errors.unit}
                        </span>
                    )}
                </div>
            </div>

            {/* Fila 1: Stock actual y stock mínimo */}
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
                            {<CircleAlert size={12} />}
                            {errors.stock}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        STOCK MÍNIMO <span className={styles.required}>*</span>
                    </label>
                    {/* Stock mínimo: alerta cuando el stock baja de este número */}
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
                            {<CircleAlert size={12} />}
                            {errors.min_stock}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}
