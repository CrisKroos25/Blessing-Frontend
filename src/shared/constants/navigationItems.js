import {
    ChartColumn,
    DollarSign,
    ShoppingCart,
    Package,
    User,
    Bolt,
} from 'lucide-react';

/**
 * Elementos de navegación del sidebar
 * Centralizado para fácil mantenimiento
 */

export const NAVIGATION_ITEMS = [
    {
        id: 1,
        label: 'Panel',
        path: '/',
        icon: ChartColumn,
    },
    {
        id: 2,
        label: 'Ventas',
        path: '/sales',
        icon: DollarSign,
    },
    {
        id: 3,
        label: 'Compras',
        path: '/purchases',
        icon: ShoppingCart,
    },
    {
        id: 4,
        label: 'Inventario',
        path: '/inventory',
        icon: Package,
    },
    {
        id: 5,
        label: 'Clientes',
        path: '/customers',
        icon: User,
    },
    {
        id: 6,
        label: 'Configuración',
        path: '/settings',
        icon: Bolt,
    },
];
