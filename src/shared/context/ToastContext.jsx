// shared/context/ToastContext.jsx
import { createContext, useContext } from 'react';
import { useToast } from '../hooks/useToast';
import ToastContainer from '../components/toast/ToastContainer';

const ToastContext = createContext(null);

// Provider — envuelve toda la app y expone las funciones del toast
export function ToastProvider({ children }) {
    const { toasts, success, error, warning, dismiss } = useToast();

    return (
        <ToastContext.Provider value={{ success, error, warning }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
}

// Hook para usar el toast desde cualquier componente
export function useToastContext() {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error('useToastContext debe usarse dentro de ToastProvider');
    return context;
}
