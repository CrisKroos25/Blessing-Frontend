import styles from './PurchaseOriginSection.module.css';
import { Store, Truck } from 'lucide-react';

function InfoField({ label, children }) {
    return (
        <div className={styles.field}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{children}</span>
        </div>
    );
}

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

export default function PurchaseOriginSection({ purchase }) {
    const hasSupplier = !!purchase.supplier;
    const hasPlace = !!purchase.place;

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>1</div>
                <div className={styles.sectionTitle}>Información de la compra</div>
            </div>

            <div className={styles.gridTwo}>
                {hasSupplier && (
                    <BadgeField
                        label="PROVEEDOR"
                        icon={<Truck size={14} />}
                        text={purchase.supplier.name}
                    />
                )}

                {hasPlace && (
                    <BadgeField
                        label="LUGAR DE COMPRA"
                        icon={<Store size={14} />}
                        text={purchase.place.name}
                    />
                )}

                {!hasSupplier && !hasPlace && (
                    <InfoField label="ORIGEN">Sin origen registrado</InfoField>
                )}

                <InfoField label="FECHA">
                    {new Date(purchase.date).toLocaleDateString('es-GT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </InfoField>
            </div>

            {purchase.notes && purchase.notes.trim() !== '' && (
                <div className={styles.field}>
                    <span className={styles.label}>NOTAS</span>
                    <p className={styles.notes}>{purchase.notes}</p>
                </div>
            )}
        </section>
    );
}