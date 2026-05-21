import { useState } from 'react';
import { useSuppliers } from '../hooks/useSuppliers';
import { useToastContext } from '@/shared/context/ToastContext';
import styles from './SuppliersPlacesView.module.css';
import Button from '@/shared/components/button/Button';

// ── Formulario reutilizable ─────────────────────────────────────────────────

function SupplierForm({ onSave, isLoading }) {
    const EMPTY = { name: '', contact: '', phone: '', nit: '' };
    const [form, setForm] = useState(EMPTY);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim()) return;
        const result = await onSave(form);
        if (result.success) setForm(EMPTY);
    };

    return (
        <div className={styles.formCard}>
            <p className={styles.formTitle}>Agregar proveedor</p>

            <div className={styles.field}>
                <label className={styles.label}>NOMBRE <span className={styles.required}>*</span></label>
                <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Ej. Distribuidora López" className={styles.input} />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>CONTACTO</label>
                <input name="contact" value={form.contact} onChange={handleChange}
                    placeholder="Ej. Carlos López" className={styles.input} />
            </div>

            <div className={styles.gridTwo}>
                <div className={styles.field}>
                    <label className={styles.label}>TELÉFONO</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                        placeholder="5555-1234" className={styles.input} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>NIT</label>
                    <input name="nit" value={form.nit} onChange={handleChange}
                        placeholder="1234567-8" className={styles.input} />
                </div>
            </div>

            <Button
                colorButton={form.name.trim() ? 'var(--primary-color)' : '#ccc'}
                sizeButton="100%"
                onClick={handleSubmit}
                disabled={!form.name.trim() || isLoading}
            >
                {isLoading ? 'Guardando...' : 'Guardar proveedor'}
            </Button>
        </div>
    );
}

function PlaceForm({ onSave, isLoading }) {
    const EMPTY = { name: '', address: '' };
    const [form, setForm] = useState(EMPTY);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim()) return;
        const result = await onSave(form);
        if (result.success) setForm(EMPTY);
    };

    return (
        <div className={styles.formCard}>
            <p className={styles.formTitle}>Agregar lugar de compra</p>

            <div className={styles.field}>
                <label className={styles.label}>NOMBRE <span className={styles.required}>*</span></label>
                <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Ej. Mercado Central" className={styles.input} />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>DIRECCIÓN <span className={styles.optional}>(opcional)</span></label>
                <input name="address" value={form.address} onChange={handleChange}
                    placeholder="Ej. Zona 1, Xela" className={styles.input} />
            </div>

            <Button
                colorButton={form.name.trim() ? 'var(--primary-color)' : '#ccc'}
                sizeButton="100%"
                onClick={handleSubmit}
                disabled={!form.name.trim() || isLoading}
            >
                {isLoading ? 'Guardando...' : 'Guardar lugar'}
            </Button>
        </div>
    );
}

// ── Lista reutilizable ──────────────────────────────────────────────────────

function ItemList({ items, onDeactivate, onReactivate, isLoading, labelField = 'name', sublabel }) {
    return (
        <div className={styles.listCard}>
            <div className={styles.listHeader}>
                <p className={styles.listTitle}>Registrados</p>
                <span className={styles.listCount}>{items.filter(i => i.is_active).length}</span>
            </div>

            {items.length === 0 && (
                <p className={styles.emptyList}>Aún no hay registros.</p>
            )}

            {items.map((item) => (
                <div key={item.id} className={`${styles.listRow} ${!item.is_active ? styles.inactive : ''}`}>
                    <div className={styles.listInfo}>
                        <p className={styles.listName}>{item[labelField]}</p>
                        {sublabel && (
                            <p className={styles.listSub}>{sublabel(item)}</p>
                        )}
                    </div>
                    <div className={styles.listActions}>
                        {item.is_active ? (
                            <button
                                className={styles.deactivateBtn}
                                onClick={() => onDeactivate(item.id)}
                                disabled={isLoading}
                            >
                                Desactivar
                            </button>
                        ) : (
                            <button
                                className={styles.reactivateBtn}
                                onClick={() => onReactivate(item.id)}
                                disabled={isLoading}
                            >
                                Reactivar
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Vista principal ─────────────────────────────────────────────────────────

const SUBTABS = [
    { key: 'suppliers', label: 'Proveedores' },
    { key: 'places',    label: 'Lugares de compra' },
];

export default function SuppliersPlacesView() {
    const [subtab, setSubtab] = useState('suppliers');
    const toast = useToastContext();

    const {
        suppliers, places, isLoading,
        createSupplier, deactivateSupplier,
        createPlace, deactivatePlace,
    } = useSuppliers();

    // Reactivar = PUT con is_active: true (pendiente en backend si se necesita)
    const handleReactivate = () => {
        toast.warning('La reactivación aún no está disponible.');
    };

    return (
        <div className={styles.container}>
            {/* Subtabs */}
            <div className={styles.subtabs}>
                {SUBTABS.map((t) => (
                    <button
                        key={t.key}
                        className={`${styles.subtab} ${subtab === t.key ? styles.subtabActive : ''}`}
                        onClick={() => setSubtab(t.key)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Contenido */}
            <div className={styles.content}>
                {subtab === 'suppliers' ? (
                    <>
                        <SupplierForm onSave={async (data) => {
                            const r = await createSupplier(data);
                            if (r.success) toast.success('Proveedor agregado.');
                            else toast.error(r.message);
                            return r;
                        }} isLoading={isLoading} />

                        <ItemList
                            items={suppliers}
                            onDeactivate={async (id) => {
                                const r = await deactivateSupplier(id);
                                if (r.success) toast.success('Proveedor desactivado.');
                                else toast.error(r.message);
                            }}
                            onReactivate={handleReactivate}
                            isLoading={isLoading}
                            sublabel={(s) => [s.phone, s.nit ? `NIT ${s.nit}` : null].filter(Boolean).join(' · ') || 'Sin datos adicionales'}
                        />
                    </>
                ) : (
                    <>
                        <PlaceForm onSave={async (data) => {
                            const r = await createPlace(data);
                            if (r.success) toast.success('Lugar agregado.');
                            else toast.error(r.message);
                            return r;
                        }} isLoading={isLoading} />

                        <ItemList
                            items={places}
                            onDeactivate={async (id) => {
                                const r = await deactivatePlace(id);
                                if (r.success) toast.success('Lugar desactivado.');
                                else toast.error(r.message);
                            }}
                            onReactivate={handleReactivate}
                            isLoading={isLoading}
                            sublabel={(p) => p.address || 'Sin dirección'}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
