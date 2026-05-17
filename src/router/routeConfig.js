/**
 * Configuración centralizada de rutas
 * Facilita el mantenimiento y escalabilidad
 */

import { Funnel, CirclePlus } from 'lucide-react';

export const ROUTE_CONFIG = {
    sales: {
        path: '/sales',
        title: 'Gestión de Ventas',
    },
    purchases: {
        path: '/commerce/purchases',
        title: 'Gestión de Compras',
    },
    inventory: {
        path: '/inventory',
        title: 'Gestión de Inventario',
    },
    customers: {
        path: '/customers',
        title: 'Gestión de clientes',
    },
    settings: {
        path: '/settings',
        title: 'Configuracion general',
    },
};

/**
 * Obtiene la configuración de ruta basada en pathname
 * @param {string} pathname - El pathname actual
 * @returns {Object} Configuración de la ruta
 */
export const getRouteConfig = (pathname) => {
    const config = Object.values(ROUTE_CONFIG).find((route) =>
        pathname.includes(route.path),
    );

    return config || {};
};
