// features/suppliers/components/modal/ModalSupplier.jsx

import styles from './ModalSupplier.module.css';
import { useState } from 'react';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';
import { CircleAlert, Truck } from 'lucide-react';

const INITIAL_FORM = {
    name: '',
    contact: '',
    phone: '',
    nit: '',
};

export default function ModalSupplier({
    action,
    supplier,
    onClose,
    onCreate,
    onUpdate,
    onDeactivate,
    onReactivate,
    onDelete,
}) {
    useBodyScrollLock(true);

    const [formData, setFormData] = useState(
        action === 'edit' ? {
            name:    supplier?.name    ?? '',
            contact: supplier?.contact ?? '',
            phone:   supplier?.phone   ?? '',
            nit:     supplier?.nit     ?? '',
        } : INITIAL_FORM
    );
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name?.trim()) newErrors.name = 'El nombre es obligatorio.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (action === 'create' || action === 'edit') {
            if (!validate()) return;
        }
        setIsSubmitting(true);
        try {
            if (action === 'create')     await onCreate(formData);
            if (action === 'edit')       await onUpdate(supplier.id, formData);
            if (action === 'deactivate') await onDeactivate(supplier.id);
            if (action === 'reactivate') await onReactivate(supplier.id);
            if (action === 'delete')     await onDelete(supplier.id);
            onClose();
        } catch (err) {
            setErrors({ general: err.message || 'Ocurrió un error.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isConfirmAction = ['deactivate', 'reactivate', 'delete'].includes(action);

    const titles = {
        create:     'Agregar proveedor',
        edit:       'Editar proveedor',
        deactivate: 'Desactivar proveedor',
        reactivate: 'Reactivar proveedor',
        delete:     'Eliminar proveedor',
    };

    const confirmMessages = {
        deactivate: <>¿Desactivar a <strong>{supplier?.name}</strong>? Dejará de aparecer en nuevas compras pero se conservará el historial.</>,
        reactivate: <>¿Reactivar a <strong>{supplier?.name}</strong>? Volverá a estar disponible para nuevas compras.</>,
        delete:     <>¿Eliminar permanentemente a <strong>{supplier?.name}</strong>? Esta acción no se puede deshacer.</>,
    };

    const confirmBtnLabels = {
        deactivate: { idle: 'Desactivar', loading: 'Desactivando...' },
        reactivate: { idle: 'Reactivar',  loading: 'Reactivando...'  },
        delete:     { idle: 'Eliminar',   loading: 'Eliminando...'   },
    };

    const confirmBtnClass = {
        deactivate: styles.warnBtn,
        reactivate: styles.successBtn,
        delete:     styles.deleteBtn,
    };

    const variant = action === 'delete' ? 'danger' : 'default';

    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${isConfirmAction ? styles.modalConfirm : styles.modalForm}`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    title={titles[action]}
                    icon={Truck}
                    subTitle={
                        action === 'create'
                            ? 'Complete los datos para registrar un proveedor'
                            : supplier?.name
                    }
                    variant={variant}
                    onClose={onClose}
                />

                <div className={styles.body}>
                    {/* ── Formulario create / edit ── */}
                    {!isConfirmAction && (
                        <div className={styles.form}>
                            {errors.general && (
                                <span className={styles.errorText}>
                                    <CircleAlert size={12} /> {errors.general}
                                </span>
                            )}

                            <div className={styles.field}>
                                <label className={styles.label}>
                                    NOMBRE <span className={styles.required}>*</span>
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej. Distribuidora López"
                                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                />
                                {errors.name && (
                                    <span className={styles.errorText}>
                                        <CircleAlert size={12} /> {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>CONTACTO</label>
                                <input
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Ej. Carlos López"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.gridTwo}>
                                <div className={styles.field}>
                                    <label className={styles.label}>TELÉFONO</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="5555-1234"
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>NIT</label>
                                    <input
                                        name="nit"
                                        value={formData.nit}
                                        onChange={handleChange}
                                        placeholder="1234567-8"
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Confirmación ── */}
                    {isConfirmAction && (
                        <div className={styles.confirmSection}>
                            {errors.general && (
                                <span className={styles.errorText}>
                                    <CircleAlert size={12} /> {errors.general}
                                </span>
                            )}
                            <p className={styles.confirmText}>
                                {confirmMessages[action]}
                            </p>
                            <div className={styles.confirmActions}>
                                <button className={styles.cancelBtn} onClick={onClose}>
                                    Cancelar
                                </button>
                                <button
                                    className={confirmBtnClass[action]}
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? confirmBtnLabels[action].loading
                                        : confirmBtnLabels[action].idle}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Footer formulario ── */}
                {!isConfirmAction && (
                    <div className={styles.footer}>
                        <button className={styles.cancelBtn} onClick={onClose}>
                            Cancelar
                        </button>
                        <button
                            className={styles.saveBtn}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}