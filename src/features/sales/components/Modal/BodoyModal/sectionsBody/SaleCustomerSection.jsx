// features/sales/components/saleDetail/SaleCustomerSection.jsx

import styles from './SaleCustomerSection.module.css';
import {
    MessageCircle,
    Store,
    CreditCard,
    Banknote,
    Building2,
} from 'lucide-react';

// ── Mapas de etiquetas e íconos ─────────────────────────────────────────────

const CONTACT_LABELS = {
    whatsapp: { label: 'WhatsApp', icon: <MessageCircle size={14} /> },
    tienda: { label: 'En tienda', icon: <Store size={14} /> },
};

const PAYMENT_LABELS = {
    efectivo: { label: 'Efectivo', icon: <Banknote size={14} /> },
    transferencia: { label: 'Transferencia', icon: <Building2 size={14} /> },
    tarjeta: { label: 'Tarjeta', icon: <CreditCard size={14} /> },
};

// ── Sub-componente: par label + valor ───────────────────────────────────────

function InfoField({ label, children }) {
    return (
        <div className={styles.field}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{children}</span>
        </div>
    );
}

// ── Sub-componente: campo con ícono (contacto, pago) ────────────────────────

function BadgeField({ label, icon, text }) {
    return (
        <div className={styles.field}>
            <span className={styles.label}>{label}</span>
            <span className={styles.badge}>
                {icon}
                {text}
            </span>
        </div>
    );
}

// ── Componente principal ────────────────────────────────────────────────────

export default function SaleCustomerSection({ sale }) {
    const contact = CONTACT_LABELS[sale.contact_method];
    const payment = PAYMENT_LABELS[sale.payment_method];

    return (
        <section className={styles.section}>
            {/* ── Header de sección ── */}
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>1</div>
                <div className={styles.sectionTitle}>
                    Información del cliente
                </div>
            </div>

            {/* ── Grid de datos ── */}
            <div className={styles.gridTwo}>
                <InfoField label="CLIENTE">{sale.customer_name}</InfoField>

                <InfoField label="TELÉFONO">{sale.telephone || '—'}</InfoField>

                {/* NIT solo si tiene valor */}
                {sale.nit && <InfoField label="NIT">{sale.nit}</InfoField>}

                {/* Dirección solo si tiene valor */}
                {sale.address && (
                    <InfoField label="DIRECCIÓN">{sale.address}</InfoField>
                )}

                {/* Contacto solo si tiene valor */}
                {contact && (
                    <BadgeField
                        label="CONTACTO"
                        icon={contact.icon}
                        text={contact.label}
                    />
                )}

                {/* Pago siempre visible */}
                {payment && (
                    <BadgeField
                        label="MÉTODO DE PAGO"
                        icon={payment.icon}
                        text={payment.label}
                    />
                )}
            </div>

            {/* ── Notas: solo si tienen contenido ── */}
            {sale.notes && sale.notes.trim() !== '' && (
                <div className={styles.field}>
                    <span className={styles.label}>NOTAS</span>
                    <p className={styles.notes}>{sale.notes}</p>
                </div>
            )}
        </section>
    );
}
