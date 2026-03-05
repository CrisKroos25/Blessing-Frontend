/**
 * Datos mock de productos
 * En una aplicación real, estos vendrían de una API
 */
export const MOCK_PRODUCTS = [
    {
        id: 1,
        image: '-',
        name: 'Peluche Oso',
        category: 'Peluches',
        stock: 12,
        stockMin: 4,
        status: 'Agotado',
        type: 'Controlado',
    },
    {
        id: 2,
        image: '-',
        name: 'Arreglo Floral',
        category: 'Arreglos florales',
        stock: 3,
        stockMin: 4,
        status: 'Disponible',
        type: 'Controlado',
    },
    {
        id: 3,
        image: '-',
        name: 'Cinta Rosa',
        category: 'Cintas',
        stock: 10,
        stockMin: 5,
        status: 'Stock bajo',
        type: 'Controlado',
    },
    {
        id: 4,
        image: '-',
        name: 'Oso de peluche Snoopy',
        category: 'Peluches',
        stock: 2,
        stockMin: 3,
        status: 'Stock bajo',
        type: 'Controlado',
    },
    {
        id: 5,
        image: '-',
        name: 'Cajita pequeña',
        category: 'Cajas de regalo',
        stock: 10,
        stockMin: 5,
        status: 'Disponible',
        type: 'Controlado',
    },
    {
        id: 6,
        image: '-',
        name: 'Cajita grande',
        category: 'Cajas de regalo',
        stock: 12,
        stockMin: 5,
        status: 'Agotado',
        type: 'Controlado',
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
