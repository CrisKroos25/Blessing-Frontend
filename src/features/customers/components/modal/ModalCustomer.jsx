// features/customers/components/modal/ModalCustomer.jsx

import styles from './ModalCustomer.module.css';
import { useState } from 'react';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';
import { CircleAlert, User } from 'lucide-react';

const INITIAL_FORM = {
    name: '',
    telephone: '',
    nit: '',
    email: '',
    address: '',
};

export default function ModalCustomer({
    action,
    customer,
    onClose,
    onCreate,
    onUpdate,
    onDeactivate,
    onReactivate,
    onDelete,
}) {
    useBodyScrollLock(true);

    const [formData, setFormData] = useState(
        action === 'edit'
            ? {
                  name: customer?.name ?? '',
                  telephone: customer?.telephone ?? '',
                  nit: customer?.nit ?? '',
                  email: customer?.email ?? '',
                  address: customer?.address ?? '',
              }
            : INITIAL_FORM,
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
        if (!formData.name?.trim())
            newErrors.name = 'El nombre es obligatorio.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (action === 'create' || action === 'edit') {
            if (!validate()) return;
        }
        setIsSubmitting(true);
        try {
            if (action === 'create') await onCreate(formData);
            if (action === 'edit') await onUpdate(customer.id, formData);
            if (action === 'deactivate') await onDeactivate(customer.id);
            if (action === 'reactivate') await onReactivate(customer.id);
            if (action === 'delete') await onDelete(customer.id);
            onClose();
        } catch (err) {
            setErrors({ general: err.message || 'Ocurrió un error.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isConfirmAction = ['deactivate', 'reactivate', 'delete'].includes(
        action,
    );

    const titles = {
        create: 'Agregar cliente',
        edit: 'Editar cliente',
        deactivate: 'Desactivar cliente',
        reactivate: 'Reactivar cliente',
        delete: 'Eliminar cliente',
    };

    const confirmMessages = {
        deactivate: (
            <>
                ¿Desactivar a <strong>{customer?.name}</strong>? Dejará de estar
                disponible pero se conservará el historial.
            </>
        ),
        reactivate: (
            <>
                ¿Reactivar a <strong>{customer?.name}</strong>? Volverá a estar
                disponible para nuevas ventas.
            </>
        ),
        delete: (
            <>
                ¿Eliminar permanentemente a <strong>{customer?.name}</strong>?
                Esta acción no se puede deshacer.
            </>
        ),
    };

    const confirmBtnLabels = {
        deactivate: { idle: 'Desactivar', loading: 'Desactivando...' },
        reactivate: { idle: 'Reactivar', loading: 'Reactivando...' },
        delete: { idle: 'Eliminar', loading: 'Eliminando...' },
    };

    const confirmBtnClass = {
        deactivate: styles.warnBtn,
        reactivate: styles.successBtn,
        delete: styles.deleteBtn,
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
                    icon={User}
                    subTitle={
                        action === 'create'
                            ? 'Complete los detalles para registrar un cliente recurrente'
                            : customer?.name
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
                                    NOMBRE{' '}
                                    <span className={styles.required}>*</span>
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ej. María García"
                                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                />
                                {errors.name && (
                                    <span className={styles.errorText}>
                                        <CircleAlert size={12} /> {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className={styles.gridTwo}>
                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        TELÉFONO
                                    </label>
                                    <input
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        placeholder="Ej. 5555-1234"
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>NIT</label>
                                    <input
                                        name="nit"
                                        value={formData.nit}
                                        onChange={handleChange}
                                        placeholder="Ej. 1234567-8 o CF"
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>CORREO</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ej. maria@correo.com"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>
                                    DIRECCIÓN
                                </label>
                                <input
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Ej. Zona 1, Xela"
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Confirmación deactivate / reactivate / delete ── */}
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
                                <button
                                    className={styles.cancelBtn}
                                    onClick={onClose}
                                >
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
