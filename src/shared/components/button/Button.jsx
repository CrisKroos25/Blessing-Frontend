// Button.jsx
import styles from './Button.module.css';

export default function Button({
    children, // Reemplaza a textButton
    colorButton = '#4f46e5', // Color por defecto
    sizeButton = 'auto',
    logoButton: Icon,
    colorFont = 'white',
    style, // Para permitir estilos extra desde fuera
    ...props // Captura todo lo demás (onClick, type, disabled, etc.)
}) {
    return (
        <button
            className={styles.button}
            style={{
                backgroundColor: colorButton,
                width: sizeButton,
                color: colorFont,
                ...style, // Combinamos los estilos base con los recibidos
            }}
            {...props} // Inyectamos automáticamente onClick, disabled, etc.
        >
            {Icon && <Icon size={20} />}
            {children}
        </button>
    );
}
