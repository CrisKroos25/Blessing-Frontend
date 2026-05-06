import styles from './OriginSection.module.css';

export default function OriginSection({ formData, onChange, suppliers, places, errors }) {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>1</span>
                <h2 className={styles.sectionTitle}>Información general</h2>
            </div>

            <div className={styles.gridThree}>
                {/* PROVEEDOR */}
                <div className={styles.field}>
                    <label className={styles.label}>PROVEEDOR</label>
                    <select
                        name="supplier_id"
                        value={formData.supplier_id}
                        onChange={onChange}
                        className={styles.select}
                    >
                        <option value="">— Ninguno —</option>
                        {suppliers.filter(s => s.is_active).map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                {/* LUGAR */}
                <div className={styles.field}>
                    <label className={styles.label}>LUGAR DE COMPRA</label>
                    <select
                        name="place_id"
                        value={formData.place_id}
                        onChange={onChange}
                        className={styles.select}
                    >
                        <option value="">— Ninguno —</option>
                        {places.filter(p => p.is_active).map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                {/* FECHA */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        FECHA <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={onChange}
                        className={`${styles.input} ${errors?.date ? styles.inputError : ''}`}
                    />
                    {errors?.date && <span className={styles.errorText}>⚠ {errors.date}</span>}
                </div>
            </div>

            {/* Error de origen (proveedor o lugar) */}
            {errors?.origin && (
                <span className={styles.errorText}>⚠ {errors.origin}</span>
            )}

            {/* NOTA */}
            <div className={styles.field}>
                <label className={styles.label}>
                    NOTA <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={onChange}
                    placeholder="Ej. Compra semanal de flores"
                    className={styles.input}
                />
            </div>
        </div>
    );
}
