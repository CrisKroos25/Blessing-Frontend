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
                        name="purchase_price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.purchase_price}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                    {errors.purchase_price && (
                        <span className={styles.errorText}>
                            {<CircleAlert size={12} />}
                            {errors.purchase_price}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>PRECIO DE VENTA</label>
                    <Input
                        name="sell_price"
                        type="number"
                        min="0"
                        value={formData.sell_price}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                    {errors.sell_price && (
                        <span className={styles.errorText}>
                            {<CircleAlert size={12} />}
                            {errors.sell_price}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}
