/**
 * Configuración centralizada de rutas
 * Facilita el mantenimiento y escalabilidad
 */

import { Funnel, CirclePlus } from 'lucide-react';

export const ROUTE_CONFIG = {
    sales: {
        path: '/sales',
        title: 'Gestión de Ventas',
        placeholder: 'Buscar venta...',
        buttonText: 'Nueva venta',
        buttonColor: 'rgb(169, 74, 137)',
        logoButtona: CirclePlus,
    },
    purchases: {
        path: '/purchases',
        title: 'Gestión de Compras',
        placeholder: 'Buscar compra...',
        buttonText: 'Nueva compra',
        buttonColor: '#3f51b5',
        logoButtona: CirclePlus,
    },
    inventory: {
        path: '/inventory',
        title: 'Gestión de Inventario',
        placeholder: 'Buscar producto...',
        buttonText: 'Filtro',
        buttonColor: '#39883c',
        logoButtona: Funnel,
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
