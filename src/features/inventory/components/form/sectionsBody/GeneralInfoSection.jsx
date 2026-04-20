// ============================================================
// GeneralInfoSection.jsx
// ------------------------------------------------------------
// Sección 1 del formulario: información general del producto.
// Contiene: nombre, descripción, categoría y tipo de producto.
// ============================================================

import styles from './GeneralInfoSection.module.css';
import Input from '@/shared/components/input/Input';
import { ShieldAlert, Package, CircleAlert } from 'lucide-react';

// Tipos de clasificación del material
const MATERIAL_TYPES = [
    {
        value: 'product',
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

export default function GeneralInfoSection({
    formData,
    handleChange,
    errors = {},
    lockType,
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

            {formData.type !== 'bundle' && (
                <div className={styles.field}>
                    <label className={styles.label}>
                        TIPO DE PRODUCTO{' '}
                        <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.typeSelector}>
                        {MATERIAL_TYPES.map(
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
                                        onClick={() => {
                                            if (lockType) return;
                                            handleChange({
                                                target: {
                                                    name: 'type',
                                                    value,
                                                },
                                            });
                                        }}
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
            )}
        </section>
    );
}
