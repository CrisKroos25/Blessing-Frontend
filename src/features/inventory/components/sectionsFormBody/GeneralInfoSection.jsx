import styles from './GeneralInfoSection.module.css';
import Input from '@/shared/components/input/Input';
import { Gift, Leaf } from 'lucide-react';

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
                        placeholder="Describe el producto - cualidades, usos, caracteristicas especiales, origen..."
                    />
                </div>
            </div>

            <div className={styles.gridTwo}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        CATEGORIA <span className={styles.required}>*</span>
                    </label>

                    <Input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Selecciona una categoria..."
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        TIPO DE PRODUCTO{' '}
                        <span className={styles.required}>*</span>
                    </label>

                    <div className={styles.typeSelector}>
                        <div
                            className={`${styles.typeCard} ${styles.typeCardActive}`}
                        >
                            <div className={styles.icon}>
                                <Leaf />
                            </div>
                            <div className={styles.typeTitle}>
                                Materia Prima
                            </div>

                            <div className={styles.typeSubtitle}>
                                Componente Base
                            </div>
                        </div>

                        <div className={styles.typeCard}>
                            <div className={styles.icon}>
                                <Gift />
                            </div>
                            <div className={styles.typeTitle}>
                                Producto Final
                            </div>

                            <div className={styles.typeSubtitle}>Arreglo</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
