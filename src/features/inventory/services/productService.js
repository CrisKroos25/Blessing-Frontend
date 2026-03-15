// ============================================================
// productService.js
// ------------------------------------------------------------
// Capa de servicio: aquí vive toda la comunicación con el backend.
// Por ahora usamos datos mock con setTimeout para simular
// la latencia de una API real.
//
// Cuando se tenga un backend, solo se cambia este archivo —
// el hook y los componentes no necesitan saber cómo viajan los datos.
// ============================================================

import { MOCK_PRODUCTS } from '@/shared/constants/products';

// Simula obtener todos los productos
// [...MOCK_PRODUCTS] devuelve una copia del array para que
// el estado de React no comparta referencia con el mock
export const fetchProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...MOCK_PRODUCTS]);
        }, 500);
    });
};

// Simula buscar un producto por su ID
// Rechaza la promesa si no lo encuentra, igual que haría una API real
export const fetchProductById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = MOCK_PRODUCTS.find((p) => p.id === id);
            product
                ? resolve(product)
                : reject(new Error(`Producto con ID ${id} no encontrado`));
        }, 300);
    });
};

// Simula crear un producto nuevo
// Usamos Math.max para generar un ID único basado en el más alto existente.
// MOCK_PRODUCTS.length + 1 falla si algún producto fue eliminado.
export const createProduct = async (productData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newId = Math.max(...MOCK_PRODUCTS.map((p) => p.id)) + 1;
            const newProduct = { id: newId, ...productData };
            MOCK_PRODUCTS.push(newProduct);
            resolve(newProduct);
        }, 500);
    });
};

// Simula actualizar un producto existente
// Spread: primero los datos viejos, luego los nuevos los sobreescriben
export const updateProduct = async (id, productData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
            if (index !== -1) {
                MOCK_PRODUCTS[index] = {
                    ...MOCK_PRODUCTS[index],
                    ...productData,
                };
                resolve(MOCK_PRODUCTS[index]);
            } else {
                reject(new Error(`Producto con ID ${id} no encontrado`));
            }
        }, 500);
    });
};

// Simula eliminar un producto
// splice(index, 1) elimina 1 elemento en la posición indicada
export const deleteProduct = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
            if (index !== -1) {
                MOCK_PRODUCTS.splice(index, 1);
                resolve(true);
            } else {
                reject(new Error(`Producto con ID ${id} no encontrado`));
            }
        }, 500);
    });
};
