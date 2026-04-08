/**
 * Datos mock de productos
 * En una aplicación real, estos vendrían de una API
 */
// MOCK_PRODUCTS — limpios y consistentes
export const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'Peluche Oso',
        description: '',
        category: 'Peluches',
        type: 'product', // ← valor del backend
        stock: 12,
        min_stock: 4,
        unit: 'pcs',
        purchase_price: 20,
        sell_price: 0,
        image: '',
        is_activate: true,
    },
    {
        id: 2,
        name: 'Rosas rojas',
        description: '',
        category: 'Peluches',
        type: 'product',
        stock: 0,
        min_stock: 4,
        unit: 'pcs',
        purchase_price: 10,
        sell_price: 0,
        image: '',
        is_activate: true,
    },
    {
        id: 3,
        name: 'Cinta Rosa',
        description: '',
        category: 'Cintas',
        type: 'product',
        stock: 10,
        min_stock: 5,
        unit: 'm',
        purchase_price: 12,
        sell_price: 0,
        image: '',
        is_activate: true,
    },
    {
        id: 4,
        name: 'Listón rojo',
        description: '',
        category: 'Decoracion',
        type: 'supply', // ← Insumo
        stock: 200,
        min_stock: 50,
        unit: 'm',
        purchase_price: 2,
        sell_price: 0,
        image: '',
        is_activate: true,
    },
    {
        id: 5,
        name: 'Papel de china',
        description: '',
        category: 'Papel',
        type: 'supply',
        stock: 3,
        min_stock: 20,
        unit: 'pcs',
        purchase_price: 0.5,
        sell_price: 0,
        image: '',
        is_activate: true,
    },
    {
        id: 6,
        name: 'Arreglo peluche con taza',
        description: 'Arreglo con peluche y decoración',
        category: 'Arreglos',
        type: 'bundle', // ← Arreglo
        stock: 8,
        min_stock: 2,
        unit: 'pcs',
        purchase_price: 0,
        sell_price: 250,
        image: '',
        is_activate: true,
        materials: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 2 },
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
// GeneralInfoSection.jsx — PRODUCT_TYPES con valores del backend
const PRODUCT_TYPES = [
    {
        value: 'product', // ← valor exacto del backend
        label: 'Controlado',
        subtitle: 'Material principal',
    },
    {
        value: 'supply',
        label: 'Insumo',
        subtitle: 'Apoyo para armado',
    },
    {
        value: 'bundle',
        label: 'Arreglo',
        subtitle: 'Arreglo completo',
    },
];
