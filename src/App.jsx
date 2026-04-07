import AppRoutes from './router';
import { ToastProvider } from './shared/context/ToastContext';

export default function App() {
    return (
        <ToastProvider>
            <AppRoutes />
        </ToastProvider>
    );
}
