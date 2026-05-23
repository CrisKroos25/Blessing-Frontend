// features/suppliers/components/modal/ModalPlace.jsx

import styles from './ModalPlace.module.css';
import { useState } from 'react';
import { useBodyScrollLock } from '@/shared/hooks/useBodyScroll';
import HeaderModal from '@/shared/components/headerModal/HeaderModal';
import { CircleAlert, MapPin } from 'lucide-react';

const INITIAL_FORM = { name: '', address: '' };

export default function ModalPlace({
    action,
    place,
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
            ? { name: place?.name ?? '', address: place?.address ?? '' }
            : INITIAL_FORM
    );
    const [errors, setErrors]         = useState({});
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
            if (action === 'edit')       await onUpdate(place.id, formData);
            if (action === 'deactivate') await onDeactivate(place.id);
            if (action === 'reactivate') await onReactivate(place.id);
            if (action === 'delete')     await onDelete(place.id);
            onClose();
        } catch (err) {
            setErrors({ general: err.message || 'Ocurrió un error.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isConfirmAction = ['deactivate', 'reactivate', 'delete'].includes(action);

    const titles = {
        create:     'Agregar lugar',
        edit:       'Editar lugar',
        deactivate: 'Desactivar lugar',
        reactivate: 'Reactivar lugar',
        delete:     'Eliminar lugar',
    };

    const confirmMessages = {
        deactivate: <>¿Desactivar <strong>{place?.name}</strong>? Dejará de estar disponible en nuevas compras.</>,
        reactivate: <>¿Reactivar <strong>{place?.name}</strong>? Volverá a estar disponible para nuevas compras.</>,
        delete:     <>¿Eliminar permanentemente <strong>{place?.name}</strong>? Esta acción no se puede deshacer.</>,
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

    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${isConfirmAction ? styles.modalConfirm : styles.modalForm}`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    title={titles[action]}
                    icon={MapPin}
                    subTitle={
                        action === 'create'
                            ? 'Complete los datos para registrar un lugar de compra'
                            : place?.name
                    }
                    variant={action === 'delete' ? 'danger' : 'default'}
                    onClose={onClose}
                />

                <div className={styles.body}>
                    {/* ── Formulario ── */}
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
                                    placeholder="Ej. Mercado Central"
                                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                />
                                {errors.name && (
                                    <span className={styles.errorText}>
                                        <CircleAlert size={12} /> {errors.name}
                                    </span>
                                )}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label}>
                                    DIRECCIÓN <span className={styles.optional}>(opcional)</span>
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