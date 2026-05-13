import ModalContent from './ModalContent';

export default function Modal({ modalState, onClose }) {
    const { action, item: purchase } = modalState;

    if (!action && !purchase) return null;

    return <ModalContent purchase={purchase} onClose={onClose} />;
}