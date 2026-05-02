import { useState } from 'react';

const INITIAL_META = {
    supplier_id: '',
    place_id: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
};

export function usePurchaseForm() {
    const [meta, setMeta]       = useState(INITIAL_META);
    const [details, setDetails] = useState([]);
    // Cada detail: { itemId, name, unit, quantity, unitPrice }

    const handleMetaChange = (e) => {
        const { name, value } = e.target;
        setMeta((prev) => ({ ...prev, [name]: value }));
    };

    // Agrega ítem; si ya existe incrementa cantidad en 1
    const addItem = (item) => {
        setDetails((prev) => {
            const exists = prev.find((d) => d.itemId === item.id);
            if (exists) {
                return prev.map((d) =>
                    d.itemId === item.id ? { ...d, quantity: d.quantity + 1 } : d
                );
            }
            return [...prev, {
                itemId:    item.id,
                name:      item.name,
                unit:      item.unit,
                quantity:  1,
                unitPrice: item.purchase_price,
            }];
        });
    };

    const updateDetail = (itemId, field, value) => {
        const numeric = value === '' ? '' : Number(value);
        if (field === 'quantity' && (numeric === 0 || numeric === '')) {
            removeDetail(itemId);
            return;
        }
        setDetails((prev) =>
            prev.map((d) => d.itemId === itemId ? { ...d, [field]: numeric } : d)
        );
    };

    const removeDetail = (itemId) => {
        setDetails((prev) => prev.filter((d) => d.itemId !== itemId));
    };

    // Total derivado — no vive en state
    const total = details.reduce((sum, d) => sum + d.quantity * d.unitPrice, 0);

    const resetForm = () => {
        setMeta(INITIAL_META);
        setDetails([]);
    };

    return {
        meta, handleMetaChange,
        details, addItem, updateDetail, removeDetail,
        total, resetForm,
    };
}
