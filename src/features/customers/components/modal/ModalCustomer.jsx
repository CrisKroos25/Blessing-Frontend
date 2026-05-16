// features/customers/components/modal/ModalCustomer.jsx

import styles from './ModalCustomer.module.css';
import { useState } from 'react';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';
import { CircleAlert } from 'lucide-react';

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
    create,
    update,
    remove,
}) {
    useBodyScrollLock(true);

    const [formData, setFormData] = useState(
        action === 'edit' ? customer : INITIAL_FORM,
    );
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name?.trim())
            newErrors.name = 'El nombre es obligatorio.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            if (action === 'create') await create(formData);
            if (action === 'edit') await update(customer.id, formData);
            if (action === 'delete') await remove(customer.id);
            onClose();
        } catch (err) {
            setErrors({ general: err.message || 'Ocurrió un error.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const titles = {
        create: 'Agregar cliente',
        edit: 'Editar cliente',
        delete: 'Eliminar cliente',
    };

    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${action === 'delete' ? styles.modalDelete : styles.modalForm}`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    title={titles[action]}
                    subTitle={
                        action === 'create'
                            ? 'Complete los detalles para registrar un cliente recurrente'
                            : customer?.name
                    }
                    variant={action === 'delete' ? 'danger' : 'default'}
                    onClose={onClose}
                />

                <div className={styles.body}>
                    {/* ── Formulario ── */}
                    {action !== 'delete' && (
                        <div className={styles.form}>
                            {errors.general && (
                                <span className={styles.errorText}>
                                    <CircleAlert size={12} /> {errors.general}
                                </span>
                            )}

                            {/* Nombre */}
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

                            {/* Teléfono + NIT */}
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

                            {/* Correo */}
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

                            {/* Dirección */}
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

                    {/* ── Confirmación de eliminación ── */}
                    {action === 'delete' && (
                        <div className={styles.deleteConfirm}>
                            <p className={styles.deleteText}>
                                ¿Estás seguro de eliminar a{' '}
                                <strong>{customer?.name}</strong>? Esta acción
                                no se puede deshacer.
                            </p>
                            <div className={styles.deleteActions}>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={styles.deleteBtn}
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? 'Eliminando...'
                                        : 'Eliminar'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Footer ── */}
                {action !== 'delete' && (
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
