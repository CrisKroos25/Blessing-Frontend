// ImageSection.jsx

import styles from './ImageSection.module.css';
import { useRef } from 'react';
import { ImagePlus, ImageOff } from 'lucide-react';

export default function ImageSection({ formData, handleChange }) {
    // useRef nos da acceso directo al <input type="file"> oculto
    // para poder abrirlo al hacer click en el recuadro
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Convertimos la imagen a base64 para poder previsualizarla
        // y guardarla en formData como string
        const reader = new FileReader();
        reader.onloadend = () => {
            handleChange({
                target: { name: 'image', value: reader.result },
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>4</div>
                <div className={styles.sectionTitle}>Imagen del producto</div>
            </div>

            <div className={styles.gridTwo}>
                {/* Recuadro 1: botón para seleccionar imagen */}
                <div
                    className={styles.uploadCard}
                    onClick={() => inputRef.current.click()}
                >
                    {/* Input oculto — lo abrimos programáticamente con el ref */}
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className={styles.hiddenInput}
                        onChange={handleFileChange}
                    />
                    <ImagePlus size={28} className={styles.uploadIcon} />
                    <span className={styles.uploadText}>Subir imagen</span>
                    <span className={styles.uploadHint}>
                        PNG, JPG hasta 5MB
                    </span>
                </div>

                {/* Recuadro 2: preview de la imagen seleccionada */}
                <div className={styles.previewCard}>
                    {formData.image ? (
                        <img
                            src={formData.image}
                            alt="Preview del producto"
                            className={styles.previewImage}
                        />
                    ) : (
                        // Si no hay imagen, mostramos un estado vacío
                        <div className={styles.emptyPreview}>
                            <ImageOff size={28} className={styles.emptyIcon} />
                            <span className={styles.emptyText}>Sin imagen</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
