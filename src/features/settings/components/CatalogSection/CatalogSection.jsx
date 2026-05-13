// features/settings/components/CatalogSection/CatalogSection.jsx
// Reutilizable: recibe items, onAdd y onRemove — funciona para categorías y unidades

import styles from './CatalogSection.module.css';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function CatalogSection({ title, items = [], onAdd, onRemove }) {
    const [input, setInput] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdd = async () => {
        const name = input.trim();
        if (!name) return;
        setIsSubmitting(true);
        try {
            await onAdd(name);
            setInput('');
            setIsAdding(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
        if (e.key === 'Escape') {
            setIsAdding(false);
            setInput('');
        }
    };

    return (
        <div className={styles.section}>
            {/* ── Header ── */}
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.counter}>
                        {items.length} elementos
                    </span>
                </div>

                <button
                    className={styles.addBtn}
                    onClick={() => setIsAdding(true)}
                >
                    <Plus size={15} />
                </button>
            </div>

            {/* ── Input inline ── */}
            {isAdding && (
                <div className={styles.inputRow}>
                    <input
                        autoFocus
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nombre..."
                        className={styles.input}
                    />
                    <button
                        className={styles.confirmBtn}
                        onClick={handleAdd}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? '...' : <Plus size={14} />}
                    </button>
                    <button
                        className={styles.cancelBtn}
                        onClick={() => {
                            setIsAdding(false);
                            setInput('');
                        }}
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* ── Lista ── */}
            <ul className={styles.list}>
                {items.length === 0 && (
                    <li className={styles.empty}>Sin elementos</li>
                )}
                {items.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <span className={styles.itemName}>{item.name}</span>
                        <button
                            className={styles.removeBtn}
                            onClick={() => onRemove(item.id)}
                        >
                            <X size={13} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
