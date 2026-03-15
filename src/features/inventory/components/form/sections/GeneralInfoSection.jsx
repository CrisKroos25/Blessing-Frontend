// ============================================================
// GeneralInfoSection.jsx
// ------------------------------------------------------------
// Sección 1 del formulario: información general del producto.
// Contiene: nombre, descripción, categoría y tipo de producto.
// ============================================================

import styles from './GeneralInfoSection.module.css';
import Input from '@/shared/components/input/Input';
import { Gift, Leaf } from 'lucide-react';

// Definimos los tipos de producto fuera del componente.
// Así si en el futuro hay más tipos, solo tocamos este array.
const PRODUCT_TYPES = [
    {
        value: 'Controlado', // valor que se guarda en formData
        label: 'Materia Prima',
        subtitle: 'Componente Base',
        icon: Leaf,
    },
    {
        value: 'Arreglo',
        label: 'Producto Final',
        subtitle: 'Arreglo',
        icon: Gift,
    },
];

export default function GeneralInfoSection({ formData, handleChange }) {
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
                    <Input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Selecciona una categoría..."
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        TIPO DE PRODUCTO{' '}
                        <span className={styles.required}>*</span>
                    </label>

                    <div className={styles.typeSelector}>
                        {/* Recorremos el array de tipos y renderizamos una card por cada uno */}
                        {PRODUCT_TYPES.map(
                            ({ value, label, subtitle, icon: Icon }) => {
                                // ¿Esta card es la que está seleccionada actualmente?
                                const isActive = formData.type === value;

                                return (
                                    <div
                                        key={value}
                                        // Si está activa, le agregamos la clase de estilos activa
                                        className={`${styles.typeCard} ${isActive ? styles.typeCardActive : ''}`}
                                        // Al hacer click, llamamos handleChange con el formato
                                        // que espera el hook useProductForm
                                        onClick={() =>
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
