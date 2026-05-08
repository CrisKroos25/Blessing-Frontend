import ModalContent from './ModalContent';

export default function Modal({ modalState, onClose }) {
    const { action, item: sale } = modalState;

    // Si no hay tipo, el modal está cerrado → no renderizamos nada
    if (!action && !sale) return null;

    return <ModalContent action={action} sale={sale} onClose={onClose} />;
}
