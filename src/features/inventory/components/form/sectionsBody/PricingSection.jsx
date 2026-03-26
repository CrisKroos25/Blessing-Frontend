// PricingSection.jsx

import styles from './PricingSection.module.css';
import Input from '@/shared/components/input/Input';
import { CircleAlert } from 'lucide-react';

export default function PricingSection({
    formData,
    handleChange,
    errors = {},
}) {
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
                        step="0.01"
                        min="0"
                        value={formData.purchasePrice}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                    {errors.purchasePrice && (
                        <span className={styles.errorText}>
                            {<CircleAlert size={12} />}
                            {errors.purchasePrice}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>PRECIO DE VENTA</label>
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
