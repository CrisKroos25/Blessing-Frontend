// PricingSection.jsx

import styles from './PricingSection.module.css';
import Input from '@/shared/components/input/Input';

export default function PricingSection({ formData, handleChange }) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>3</div>
                <div className={styles.sectionTitle}>Precios</div>
            </div>

            <div className={styles.gridTwo}>
                <div className={styles.field}>
                    <label className={styles.label}>
                        PRECIO DE COMPRA{' '}
                        <span className={styles.required}>*</span>
                    </label>
                    <Input
                        name="purchasePrice"
                        type="number"
                        min="0"
                        value={formData.purchasePrice}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        PRECIO DE VENTA{' '}
                        <span className={styles.required}>*</span>
                    </label>
                    <Input
                        name="salePrice"
                        type="number"
                        min="0"
                        value={formData.salePrice}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </div>
            </div>
        </section>
    );
}
