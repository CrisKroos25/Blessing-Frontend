// ============================================================
// InventorySection.jsx
// ------------------------------------------------------------
// Sección 2 del formulario: datos de inventario.
// Contiene: stock actual, stock mínimo, unidad de medida
// y clasificación del material (controlado o insumo).
// ============================================================

import styles from './InventorySection.module.css';
import Input from '@/shared/components/input/Input';
import { ShieldAlert, Package } from 'lucide-react';

// Opciones para el selector de unidades de medida
const UNIT_OPTIONS = [
    { value: 'kg', label: 'Kilogramos (kg)' },
    { value: 'g', label: 'Gramos (g)' },
    { value: 'l', label: 'Litros (l)' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'pcs', label: 'Piezas (pcs)' },
    { value: 'm', label: 'Metros (m)' },
];

// Tipos de clasificación del material
const MATERIAL_TYPES = [
    {
        value: 'controlled',
        label: 'Controlado',
        subtitle:
            'Seguimiento riguroso de cantidades, alertas de stock mínimo y registros de uso.',
        icon: ShieldAlert,
    },
    {
        value: 'supply',
        label: 'Insumo',
        subtitle:
            'Compatibilidad con artículos con seguimiento más sencillo: cinta, fomi, papel, etc.',
        icon: Package,
    },
];

export default function InventorySection({ formData, handleChange }) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>2</div>
                <div className={styles.sectionTitle}>Inventario</div>
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
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        STOCK MÍNIMO <span className={styles.required}>*</span>
                    </label>
                    {/* Stock mínimo: alerta cuando el stock baja de este número */}
                    <Input
                        name="stockMin"
                        type="number"
                        min="0"
                        value={formData.stockMin}
                        onChange={handleChange}
                        placeholder="0"
                    />
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
                </div>
            </div>

            {/* Fila 3: Clasificación del material */}
            <div className={styles.field}>
                <label className={styles.label}>
                    CLASIFICACIÓN <span className={styles.required}>*</span>
                </label>
                <div className={styles.typeSelector}>
                    {MATERIAL_TYPES.map(
                        ({ value, label, subtitle, icon: Icon }) => {
                            const isActive = formData.materialType === value;

                            return (
                                <div
                                    key={value}
                                    className={`${styles.typeCard} ${isActive ? styles.typeCardActive : ''}`}
                                    onClick={() =>
                                        handleChange({
                                            target: {
                                                name: 'materialType',
                                                value,
                                            },
                                        })
                                    }
                                >
                                    <div className={styles.icon}>
                                        <Icon size={20} />
                                    </div>
                                    <div className={styles.typeTitle}>
                                        {label}
                                    </div>
                                    <div className={styles.typeSubtitle}>
                                        {subtitle}
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        </section>
    );
}
