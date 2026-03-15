/**
 * Datos mock de productos
 * En una aplicación real, estos vendrían de una API
 */
export const MOCK_PRODUCTS = [
    {
        id: 1,
        image: '',
        name: 'Peluche Oso',
        description: '',
        category: 'Peluches',
        stock: 12,
        stockMin: 4,
        unit: '',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 20,
        salePrice: '',
    },
    {
        id: 2,
        image: '',
        name: 'Arreglo Floral',
        description: '',
        category: 'Arreglos florales',
        stock: 0,
        stockMin: 4,
        unit: '',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 10,
        salePrice: '',
    },
    {
        id: 3,
        image: '',
        name: 'Cinta Rosa',
        description: '',
        category: 'Cintas',
        stock: 10,
        stockMin: 5,
        unit: '',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 12,
        salePrice: '',
    },
    {
        id: 4,
        image: '',
        name: 'Oso de peluche Snoopy',
        description: '',
        category: 'Peluches',
        stock: 2,
        stockMin: 3,
        unit: '',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 30,
        salePrice: '',
    },
    {
        id: 5,
        image: '',
        name: 'Cajita pequeña',
        description: '',
        category: 'Cajas de regalo',
        stock: 10,
        stockMin: 5,
        unit: '',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 21,
        salePrice: '',
    },
    {
        id: 6,
        image: '',
        name: 'Cajita grande',
        description: '',
        category: 'Cajas de regalo',
        stock: 12,
        stockMin: 5,
        unit: '',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 40,
        salePrice: '',
    },
];

/**
 * Estados posibles de un producto
 */
export const PRODUCT_STATUS = {
    AVAILABLE: 'Disponible',
    LOW_STOCK: 'Stock bajo',
    OUT_OF_STOCK: 'Agotado',
};

/**
 * Tipos de productos
 */
export const PRODUCT_TYPE = {
    CONTROLLED: 'Controlado',
    UNCONTROLLED: 'No controlado',
};
