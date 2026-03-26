// ============================================================
// GeneralInfoSection.jsx
// ------------------------------------------------------------
// Sección 1 del formulario: información general del producto.
// Contiene: nombre, descripción, categoría y tipo de producto.
// ============================================================

import styles from './GeneralInfoSection.module.css';
import Input from '@/shared/components/input/Input';
import { Gift, Leaf, CircleAlert } from 'lucide-react';

// Definimos los tipos de producto fuera del componente.
// Así si en el futuro hay más tipos, solo tocamos este array.
const PRODUCT_TYPES = [
    {
        value: 'Controlado', // valor que se guarda en formData
        label: 'Controlado',
        subtitle: 'Material',
        icon: Leaf,
    },
    {
        value: 'Insumos',
        label: 'Insumo',
        subtitle: 'Apoyo para armado',
        icon: Gift,
    },
    {
        value: 'Finales',
        label: 'Arreglo',
        subtitle: 'Arreglo completo',
        icon: Gift,
    },
];

const CATEGORY_OPTIONS = [
    { value: 'Peluches', label: 'Peluches' },
    { value: 'Arreglos', label: 'Arreglos finales' },
    { value: 'Cintas', label: 'Cintas' },
    { value: 'Cajas', label: 'Cajas de regalo' },
    { value: 'Decoracion', label: 'Piezas de decoracion' },
    { value: 'Papel', label: 'Papel' },
];

export default function GeneralInfoSection({
    formData,
    handleChange,
    lockType,
    errors = {},
}) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>1</div>
                <div className={styles.sectionTitle}>Información General</div>
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        NOMBRE DE PRODUCTO{' '}
                        <span className={styles.required}>*</span>
                    </label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.j Peluche de Snoopy"
                    />
                    {errors.name && (
                        <span className={styles.errorText}>
                            {<CircleAlert size={12} />} {errors.name}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>DESCRIPCIÓN</label>
                    <textarea
                        name="description"
                        className={styles.textarea}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe el producto - cualidades, usos, características especiales, origen..."
                    />
                </div>
            </div>

            <div className={styles.gridTwo}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        CATEGORÍA <span className={styles.required}>*</span>
                    </label>
                    <select
                        name="category"
                        className={styles.select}
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecciona una unidad...
                        </option>
                        {CATEGORY_OPTIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <span className={styles.errorText}>
                            {<CircleAlert size={12} />}
                            {errors.category}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        TIPO DE PRODUCTO{' '}
                        <span className={styles.required}>*</span>
                    </label>

                    <div className={styles.typeSelector}>
                        {PRODUCT_TYPES.map(
                            ({ value, label, subtitle, icon: Icon }) => {
                                const isActive = formData.type === value;

                                return (
                                    <div
                                        key={value}
                                        className={`
                            ${styles.typeCard}
                            ${isActive ? styles.typeCardActive : ''}
                            ${lockType ? styles.typeCardLocked : ''}
                        `}
                                        // Si lockType está activo, no hacemos nada al click
                                        onClick={() =>
                                            !lockType &&
                                            handleChange({
                                                target: { name: 'type', value },
                                            })
                                        }
                                    >
                                        <div className={styles.icon}>
                                            <Icon />
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
            </div>
        </section>
    );
}
