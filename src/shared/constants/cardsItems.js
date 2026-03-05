import { Box, TriangleAlert, DollarSign, Boxes } from 'lucide-react';

export const CARDS_ITEMS = [
    {
        id: 1,
        logoButton: Box,
        numberTitle: '156',
        titleInformation: 'Productos controlados',
        description: '12 categorias',
        status: 'warning',
    },
    {
        id: 2,
        logoButton: TriangleAlert,
        numberTitle: '23',
        titleInformation: 'Artículos con pocas existencias',
        description: '5 alertas críticas',
        status: 'lower',
    },
    {
        id: 3,
        logoButton: DollarSign,
        numberTitle: 'Q6,000',
        titleInformation: 'Valor total del inventario',
        description: 'Valoración actual',
        status: 'okey',
    },
    {
        id: 4,
        logoButton: Boxes,
        numberTitle: '16',
        titleInformation: 'Tipos de productos ensamblados',
        description: 'Arreglos activos',
        status: 'warning',
    },
];
