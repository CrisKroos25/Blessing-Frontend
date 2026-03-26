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
        unit: 'pcs',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 20,
        salePrice: '',
    },
    {
        id: 2,
        image: '',
        name: 'Rosas rojas',
        description: '',
        category: 'Rosas',
        stock: 0,
        stockMin: 4,
        unit: 'pcs',
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
        unit: 'm',
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
        unit: 'pcs',
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
        unit: 'pcs',
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
        unit: 'pcs',
        materialType: '',
        type: 'Controlado',
        purchasePrice: 40,
        salePrice: '',
        // Materiales indirectos
    },
    {
        id: 7,
        name: 'Listón rojo',
        type: 'supply',
        category: 'Decoración',
        stock: 200,
        stockMin: 50,
        purchasePrice: 2,
        salePrice: 0,
        unit: 'm',
        type: 'Insumos',
    },
    {
        id: 8,
        name: 'Papel de china',
        type: 'supply',
        category: 'Papel',
        stock: 500,
        stockMin: 100,
        purchasePrice: 0.5,
        salePrice: 0,
        unit: 'pcs',
        type: 'Insumos',
    },

    // Productos finales
    {
        id: 9,
        name: 'Arreglo de peluche con taza',
        type: 'final',
        category: 'Arreglos',
        stock: 8,
        stockMin: 2,
        purchasePrice: 0,
        salePrice: 250,
        unit: 'pcs',
        type: 'Finales',
        //  esto es lo nuevo — los materiales que lo componen
        materials: [
            { productId: 1, quantity: 1 }, // 1 Taza blanca
            { productId: 2, quantity: 1 }, // 1 Peluche oso
            { productId: 3, quantity: 2 }, // 2 metros de listón
        ],
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
