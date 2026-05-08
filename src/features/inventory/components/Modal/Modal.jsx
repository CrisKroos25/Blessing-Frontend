import ModalContent from './ModalContent';

export default function Modal({
    modalState,
    onClose,
    create,
    update,
    remove,
    defaultType,
    allProducts,
}) {
    const { action, item: product } = modalState;

    // Si no hay tipo, el modal está cerrado → no renderizamos nada
    if (!action) return null;

    return (
        <ModalContent
            action={action}
            product={product}
            defaultType={defaultType}
            onClose={onClose}
            create={create}
            update={update}
            remove={remove}
            allProducts={allProducts} // Solo lo usa FinalProducts.jsx
        />
    );
}
