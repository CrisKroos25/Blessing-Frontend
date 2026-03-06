import styles from './Input.module.css';

export default function Input({
    type = 'text',
    value = '',
    onChange,
    placeholder = '',
    id,
    name,
    disabled = false,
}) {
    return (
        <div className={styles.inputWrapper}>
            <input
                id={id}
                name={name}
                type={type}
                className={styles.input}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}
