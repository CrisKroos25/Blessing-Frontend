/**
 * Servicio para operaciones CRUD de productos
 * En producción, aquí se harían llamadas a una API real
 */

import { MOCK_PRODUCTS } from '@/shared/constants/products';

/**
 * Obtiene todos los productos
 * @returns {Promise<Array>} Lista de productos
 */
export const fetchProducts = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...MOCK_PRODUCTS]); // 👈 CLON
        }, 500);
    });
};

/**
 * Obtiene un producto por ID
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} Producto encontrado
 */
export const fetchProductById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = MOCK_PRODUCTS.find((p) => p.id === id);
            if (product) {
                resolve(product);
            } else {
                reject(new Error(`Producto con ID ${id} no encontrado`));
            }
        }, 300);
    });
};

/**
 * Crea un nuevo producto
 * @param {Object} productData - Datos del nuevo producto
 * @returns {Promise<Object>} Producto creado
 */
export const createProduct = async (productData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newProduct = {
                id: MOCK_PRODUCTS.length + 1,
                ...productData,
            };
            MOCK_PRODUCTS.push(newProduct);
            resolve(newProduct);
        }, 500);
    });
};

/**
 * Actualiza un producto
 * @param {number} id - ID del producto
 * @param {Object} productData - Datos actualizados
 * @returns {Promise<Object>} Producto actualizado
 */
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

/**
 * Elimina un producto
 * @param {number} id - ID del producto
 * @returns {Promise<boolean>} True si se eliminó correctamente
 */
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
