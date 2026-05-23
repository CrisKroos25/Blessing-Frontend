import styles from './InventoryCards.module.css';
import CardInfo from '@/shared/components/cardInfo/CardInfo';
import { Box, TriangleAlert, PiggyBank, Boxes } from 'lucide-react';

export default function InventoryCards({ products }) {
    // Calculamos los valores ANTES de armar el array
    // así la lógica es clara y separada de la presentación

    const criticStockCount = products.filter(
        (product) => product.stock === 0,
    ).length;

    const lowCount = products.filter(
        (product) => product.stock < product.min_stock && product.stock !== 0,
    ).length;

    const totalValue = products.reduce(
        (acc, product) => acc + Number(product.sell_price || 0) * Number(product.stock || 0),
        0,
    );

    const valueCards = [
        {
            id: 1,
            total: products.filter((product) => product.type == 'product')
                .length,
            subtitle: 'Productos controlados',
            description: '12 categorías',
            icon: Box,
            status: 'warning',
        },
        {
            id: 2,
            total: lowCount,
            subtitle: 'Artículos con pocas existencias',
            description: `${criticStockCount} alertas críticas`,
            icon: TriangleAlert,
            status: 'lower',
        },
        {
            id: 3,
            total: 'Q ' + totalValue.toFixed(2),
            subtitle: 'Valor total del inventario',
            description: 'Precio de venta × stock',
            icon: PiggyBank,
            status: 'okey',
        },
        {
            id: 4,
            total: products.filter((product) => product.type == 'bundle')
                .length,
            subtitle: 'Productos ensamblados',
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