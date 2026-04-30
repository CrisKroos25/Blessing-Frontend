// ImageSection.jsx
// Maneja la imagen del producto: subir, previsualizar, editar y eliminar.
// Diseñado para escalar a múltiples imágenes — internamente ya trabaja con
// un array `images[]`, aunque por ahora solo se usa el primer elemento.

import styles from './ImageSection.module.css';
import { useRef } from 'react';
import { ImagePlus, Pencil, Trash2, ImageOff } from 'lucide-react';

export default function ImageSection({ formData, handleChange }) {
    const inputRef = useRef(null);

    // Normaliza la imagen actual a un formato consistente.
    // Puede ser un File (nueva), una URL string (backend), o null.
    const currentImage = formData.image || null;
    const hasImage = Boolean(currentImage);

    // Genera la URL para mostrar el preview
    const previewSrc =
        currentImage instanceof File
            ? URL.createObjectURL(currentImage) // archivo nuevo — preview local
            : currentImage; // URL del backend

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Guardamos el File real para que buildFormData lo envíe como multipart
        handleChange({ target: { name: 'image', value: file } });

        // Limpia el input para permitir seleccionar el mismo archivo de nuevo
        e.target.value = '';
    };

    const handleRemove = () => {
        // Setea image a null — el service interpretará esto como "eliminar imagen"
        handleChange({ target: { name: 'image', value: null } });
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>4</div>
                <div className={styles.sectionTitle}>Imagen del producto</div>
            </div>

            {/* Input oculto — se abre programáticamente */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenInput}
                onChange={handleFileChange}
            />

            {hasImage ? (
                /* ── Estado: tiene imagen ──────────────────────────────── */
                <div className={styles.imageContainer}>
                    <img
                        src={previewSrc}
                        alt="Preview del producto"
                        className={styles.previewImage}
                    />

                    {/* Overlay con acciones — aparece al hacer hover */}
                    <div className={styles.overlay}>
                        <button
                            className={styles.overlayBtn}
                            onClick={() => inputRef.current.click()}
                            title="Cambiar imagen"
                        >
                            <Pencil size={16} />
                            <span>Cambiar</span>
                        </button>
                        <button
                            className={`${styles.overlayBtn} ${styles.overlayBtnDanger}`}
                            onClick={handleRemove}
                            title="Eliminar imagen"
                        >
                            <Trash2 size={16} />
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            ) : (
                /* ── Estado: sin imagen — ocupa todo el ancho ──────────── */
                <div
                    className={styles.uploadCard}
                    onClick={() => inputRef.current.click()}
                >
                    <ImagePlus size={32} className={styles.uploadIcon} />
                    <span className={styles.uploadText}>Subir imagen</span>
                    <span className={styles.uploadHint}>
                        PNG, JPG hasta 5MB
                    </span>
                </div>
            )}
        </section>
    );
}
