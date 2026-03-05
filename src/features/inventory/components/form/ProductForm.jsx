import { useState, useEffect } from 'react';

export default function ProductForm({ product }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        stock: '',
        stockMin: '',
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

    return (
        <form>
            <fieldset>
                <div>
                    <label>Nombre: </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Categoria: </label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Stock: </label>
                    <input
                        type="text"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Stock mínimo: </label>
                    <input
                        type="text"
                        name="stockMin"
                        value={formData.stockMin}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
        </form>
    );
}
