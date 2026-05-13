// shared/components/Modal/Modal.jsx

export default function Modal({ modalState, children }) {
    if (!modalState?.action) return null;
    return children;
}
