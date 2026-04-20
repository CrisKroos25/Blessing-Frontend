// ClientSection.jsx
// Sección 1 del formulario de venta: datos del cliente.
// Requeridos: nombre, teléfono. Opcionales: NIT, dirección, medio de contacto.

import styles from './ClientSection.module.css';
import { MessageCircle, Store } from 'lucide-react';

// Opciones de medio de contacto con ícono y etiqueta
const MEDIOS_CONTACTO = [
    { value: 'whatsapp', icon: <MessageCircle size={18} />, label: 'WhatsApp' },
    { value: 'tienda', icon: <Store size={18} />, label: 'En tienda' },
];

export default function ClientSection({ formData, onChange, errors }) {
    return (
        <div className={styles.section}>
            {/* ── Header ───────────────────────────────────────────────── */}
            <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>1</span>
                <h2 className={styles.sectionTitle}>Datos del cliente</h2>
            </div>

            <div className={styles.gridTwo}>
                {/* ── NOMBRE ───────────────────────────────────────────── */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        NOMBRE <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={onChange}
                        placeholder="Ej. María García"
                        className={`${styles.input} ${errors.customer_name ? styles.inputError : ''}`}
                    />
                    {errors.customer_name && (
                        <span className={styles.errorText}>
                            ⚠ {errors.customer_name}
                        </span>
                    )}
                </div>

                {/* ── TELÉFONO ─────────────────────────────────────────── */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        TELÉFONO <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={onChange}
                        placeholder="Ej. 5555-1234"
                        className={`${styles.input} ${errors.telephone ? styles.inputError : ''}`}
                    />
                    {errors.telephone && (
                        <span className={styles.errorText}>
                            ⚠ {errors.telephone}
                        </span>
                    )}
                </div>

                {/* ── NIT ──────────────────────────────────────────────── */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        NIT <span className={styles.optional}>(opcional)</span>
                    </label>
                    <input
                        type="text"
                        name="nit"
                        value={formData.nit}
                        onChange={onChange}
                        placeholder="Ej. 1234567-8 o CF"
                        className={styles.input}
                    />
                </div>

                {/* ── DIRECCIÓN ────────────────────────────────────────── */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        DIRECCIÓN{' '}
                        <span className={styles.optional}>(opcional)</span>
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={onChange}
                        placeholder="Ej. Zona 1, Xela"
                        className={styles.input}
                    />
                </div>

                {/* ── MEDIO DE CONTACTO ────────────────────────────────── */}
                {/* Ocupa las 2 columnas. Usamos cards visuales en lugar de radios nativos */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label}>
                        MEDIO DE CONTACTO{' '}
                        <span className={styles.optional}>(opcional)</span>
                    </label>
                    <div className={styles.contactoOptions}>
                        {MEDIOS_CONTACTO.map(({ value, icon, label }) => (
                            <label
                                key={value}
                                className={styles.contactoOption}
                            >
                                {/* Radio oculto — solo para manejar el estado */}
                                <input
                                    type="radio"
                                    name="contact_method"
                                    value={value}
                                    checked={formData.contact_method === value}
                                    onChange={onChange}
                                />
                                {/* Card visual que reacciona al estado del radio */}
                                <div
                                    className={`${styles.contactoCard} ${formData.contact_method === value ? styles.contactoCardActive : ''}`}
                                >
                                    <span className={styles.contactoIcon}>
                                        {icon}
                                    </span>
                                    <span className={styles.contactoLabel}>
                                        {label}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
