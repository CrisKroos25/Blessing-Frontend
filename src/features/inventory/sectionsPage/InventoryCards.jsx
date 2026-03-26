import styles from './InventoryCards.module.css';
import CardInfo from '@/shared/components/cardInfo/CardInfo';
import { Box, TriangleAlert, DollarSign, Boxes, icons } from 'lucide-react';

export default function InventoryCards({ products }) {
    // Calculamos los valores ANTES de armar el array
    // así la lógica es clara y separada de la presentación

    const lowStockCount = products.filter(
        (product) => product.stock < product.stockMin,
    ).length;

    const totalValue = products.reduce(
        (acc, product) => acc + Number(product.purchasePrice),
        0,
    );

    const valueCards = [
        {
            id: 1,
            total: products.filter((product) => product.type == 'Controlado')
                .length,
            subtitle: 'Productos controlados',
            description: '12 categorías',
            icon: Box,
            status: 'warning',
        },
        {
            id: 2,
            total: lowStockCount,
            subtitle: 'Artículos con pocas existencias',
            description: `${lowStockCount} alertas críticas`,
            icon: TriangleAlert,
            status: 'lower',
        },
        {
            id: 3,
            total: 'Q ' + totalValue,
            subtitle: 'Valor total del inventario',
            description: 'Precio de compra acumulado',
            icon: DollarSign,
            status: 'okey',
        },
        {
            id: 4,
            total: products.filter((product) => product.type == 'Finales')
                .length,
            subtitle: 'Tipos de productos ensamblados',
            description: 'Arreglos activos',
            icon: Boxes,
            status: 'warning',
        },
    ];

    return (
        <div className={styles.container__cards}>
            {valueCards.map((item) => (
                <CardInfo
                    key={item.id}
                    numberTitle={item.total}
                    titleInformation={item.subtitle}
                    description={item.description}
                    status={item.status}
                    logoButton={item.icon}
                />
            ))}
        </div>
    );
}
