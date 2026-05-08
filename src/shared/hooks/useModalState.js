// ============================================================
// hooks/useModalState.js
// ------------------------------------------------------------
// Este hook extrae TODA la lógica del modal fuera del componente.
//
// ¿Por qué hacer esto?
// Si dejamos la lógica dentro del componente, el archivo crece
// y mezcla "qué se muestra" con "cómo funciona".
// Un hook separa esas responsabilidades claramente.
// ============================================================

import { useState } from 'react';

export function useModalState() {
    // El estado del modal tiene dos datos:
    //   - action:    qué acción se va a hacer ('create' | 'edit' | 'delete' | null)
    //   - item: el itemo seleccionado (o null si es uno nuevo)
    const [modalState, setModalState] = useState({
        action: null,
        item: null,
    });

    // Abre el modal con el tipo y itemo que le pasemos
    // Ejemplo de uso: openModal('edit', { id: 1, name: 'Hilo rojo' })
    const openModal = (action, item) => {
        setModalState({ action, item });
    };

    // Cierra el modal reseteando el estado a sus valores iniciales
    const closeModal = () => {
        setModalState({ action: null, item: null });
    };

    // Devolvemos los datos y las funciones para que el componente los use
    return {
        modalState,
        openModal,
        closeModal,
    };
}
