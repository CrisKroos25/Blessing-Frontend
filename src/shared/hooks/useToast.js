// shared/hooks/useToast.js
// ============================================================
// Hook global para mostrar notificaciones toast.
// Expone: toasts (lista actual) + funciones para mostrarlos.
// ============================================================

import { useState, useCallback } from 'react';

export function useToast() {
    const [toasts, setToasts] = useState([]);

    // Agrega un toast nuevo — se elimina automáticamente después de `duration` ms
    const showToast = useCallback(
        ({ message, type = 'success', duration = 4000 }) => {
            const id = Date.now(); // ID único basado en timestamp

            setToasts((prev) => [...prev, { id, message, type }]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        },
        [],
    );

    // Atajos para los tipos más comunes
    const success = useCallback(
        (message) => showToast({ message, type: 'success' }),
        [showToast],
    );
    const error = useCallback(
        (message) => showToast({ message, type: 'error' }),
        [showToast],
    );
    const warning = useCallback(
        (message) => showToast({ message, type: 'warning' }),
        [showToast],
    );

    // Elimina un toast manualmente (al hacer click en X)
    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return { toasts, success, error, warning, dismiss };
}
