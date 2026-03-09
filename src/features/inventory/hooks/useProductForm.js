import { useState, useEffect } from 'react';

export function useProductForm(product) {
    const [formData, setFormData] = useState({
        name: '',
        status: '',
        category: '',
        productType: '',
        stock: '',
        stockMin: '',
        price: '',
        image: '',
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        formData,
        handleChange,
    };
}
