// ClientSection.jsx
// Sección 1 del formulario de venta: datos del cliente.
// Requeridos: nombre, teléfono. Opcionales: NIT, dirección, medio de contacto.

import styles from './ClientSection.module.css';
import {
    MessageCircle,
    Store,
    Banknote,
    CreditCard,
    Repeat,
    CircleAlert,
} from 'lucide-react';

// Opciones de medio de contacto con ícono y etiqueta
const MEDIOS_CONTACTO = [
    { value: 'whatsapp', icon: <MessageCircle size={18} />, label: 'WhatsApp' },
    { value: 'tienda', icon: <Store size={18} />, label: 'En tienda' },
];

const METODOS_PAGO = [
    { value: 'efectivo', icon: <Banknote size={18} />, label: 'Efectivo' },
    {
        value: 'transferencia',
        icon: <Repeat size={18} />,
        label: 'Transferencia',
    },
    { value: 'tarjeta', icon: <CreditCard size={18} />, label: 'Tarjeta' },
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
                            {<CircleAlert size={12} />} {errors.customer_name}
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
                            {<CircleAlert size={12} />} {errors.telephone}
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
                    <label className={styles.label}>DIRECCIÓN </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={onChange}
                        placeholder="Ej. Zona 1, Xela"
                        className={styles.input}
                    />
                </div>

                <div className={styles.containerMethods}>
                    {/* ── MEDIO DE CONTACTO ────────────────────────────────── */}
                    {/* Ocupa las 2 columnas. Usamos cards visuales en lugar de radios nativos */}
                    <div className={`${styles.field}`}>
                        <label className={styles.label}>
                            MEDIO DE CONTACTO{' '}
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
                                        checked={
                                            formData.contact_method === value
                                        }
                                        onChange={onChange}
                                    />
                                    {/* Card visual que reacciona al estado del radio */}
                                    <div
                                        className={`${styles.contactoCard} ${formData.contact_method === value ? styles.contactoCardActive : styles.contactoCardSelect}`}
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

                    {/* ── MÉTODO DE PAGO ───────────────────────────────────── */}
                    <div className={`${styles.field} `}>
                        <label className={styles.label}>METODOS DE PAGO </label>
                        <div className={styles.contactoOptions}>
                            {METODOS_PAGO.map(({ value, icon, label }) => (
                                <label
                                    key={value}
                                    className={styles.contactoOption}
                                >
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value={value}
                                        checked={
                                            formData.payment_method === value
                                        }
                                        onChange={onChange}
                                    />
                                    <div
                                        className={`${styles.contactoCard} ${formData.payment_method === value ? styles.contactoCardActive : ''} ${errors.payment_method ? styles.contactoCardNotSelected : styles.contactoCardSelect}`}
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
                        {errors.payment_method && (
                            <span className={styles.errorText}>
                                {<CircleAlert size={12} />}{' '}
                                {errors.payment_method}
                            </span>
                        )}
                    </div>
                </div>
                {/* ── NOTAS ────────────────────────────────────────────── */}
                <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label}>NOTAS </label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={onChange}
                        placeholder="Ej. Entregar el sábado, dedicatoria incluida..."
                        rows={3}
                        className={styles.textarea}
                    />
                </div>
            </div>
        </div>
    );
}
