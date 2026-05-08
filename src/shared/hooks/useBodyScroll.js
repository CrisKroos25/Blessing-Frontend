// ============================================================
// hooks/useBodyScrollLock.js
// ------------------------------------------------------------
// Este hook bloquea el scroll de la página cuando el modal
// está abierto, y lo restaura cuando se cierra.
//
// Lo sacamos del Modal para que ese archivo sea más limpio.
// Además, este hook puede reutilizarse en cualquier otro modal
// del proyecto.
// ============================================================

import { useEffect } from 'react';

export function useBodyScrollLock(isLocked) {
    useEffect(() => {
        // Si isLocked es true → bloqueamos el scroll
        // Si isLocked es false → lo restauramos
        document.body.style.overflow = isLocked ? 'hidden' : 'auto';

        // La función de cleanup se ejecuta cuando:
        //   - el componente se desmonta
        //   - isLocked cambia de valor
        // Siempre restauramos el scroll al limpiar
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLocked]);
}
