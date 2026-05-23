import styles from './DashboardLayout.module.css';
import { Box, TriangleAlert, PiggyBank, Boxes, Clock, BarChart2 } from 'lucide-react';

import CardInfo from '@/shared/components/cardInfo/CardInfo';
import QuickAccess from '../components/QuickAccess/QuickAccess';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import StockAlerts from '../components/StockAlerts/StockAlerts';
import SalesChart from '../components/SalesChart/SalesChart';

function SectionCard({ title, icon: Icon, children }) {
    return (
        <div className={styles.sectionCard}>
            <p className={styles.sectionTitle}>
                {Icon && <Icon size={15} />}
                {title}
            </p>
            {children}
        </div>
    );
}

export default function DashboardLayout({
    metrics,
    recentActivity,
    stockAlerts,
    salesByCategory,
    monthTotals,
}) {
    const formatQ = (v) => `Q ${Number(v).toFixed(2)}`;

    const cards = [
        {
            id: 1,
            numberTitle: metrics.controlled,
            titleInformation: 'Productos controlados',
            description: '12 categorías',
            icon: Box,
            status: 'warning',
        },
        {
            id: 2,
            numberTitle: metrics.lowStock,
            titleInformation: 'Stock bajo',
            description: `${metrics.criticalStock} alertas críticas`,
            icon: TriangleAlert,
            status: 'lower',
        },
        {
            id: 3,
            numberTitle: formatQ(metrics.totalValue),
            titleInformation: 'Valor del inventario',
            description: 'Precio de venta × stock',
            icon: PiggyBank,
            status: 'okey',
        },
        {
            id: 4,
            numberTitle: metrics.bundles,
            titleInformation: 'Arreglos activos',
            description: 'Tipos ensamblados',
            icon: Boxes,
            status: 'warning',
        },
    ];

    return (
        <div className={styles.layout}>

            {/* ── Métricas ── */}
            <div className={styles.metricsRow}>
                {cards.map((card) => (
                    <CardInfo
                        key={card.id}
                        logoButton={card.icon}
                        numberTitle={card.numberTitle}
                        titleInformation={card.titleInformation}
                        description={card.description}
                        status={card.status}
                    />
                ))}
            </div>

            {/* ── Accesos rápidos ── */}
            <QuickAccess />

            {/* ── Actividad + Alertas/Gráfica ── */}
            <div className={styles.bottomRow}>

                <SectionCard title="Actividad reciente" icon={Clock}>
                    <ActivityFeed activity={recentActivity} />
                </SectionCard>

                <div className={styles.rightCol}>
                    <SectionCard title="Alertas de stock" icon={TriangleAlert}>
                        <StockAlerts alerts={stockAlerts} />
                    </SectionCard>

                    <SectionCard title="Ventas del mes por categoría" icon={BarChart2}>
                        <SalesChart data={salesByCategory} />
                        <div className={styles.totalsRow}>
                            <div className={styles.totalItem}>
                                <span className={styles.totalLabel}>Ventas</span>
                                <span className={`${styles.totalVal} ${styles.pink}`}>
                                    {formatQ(monthTotals.sales)}
                                </span>
                            </div>
                            <div className={styles.totalItem}>
                                <span className={styles.totalLabel}>Compras</span>
                                <span className={`${styles.totalVal} ${styles.blue}`}>
                                    {formatQ(monthTotals.purchases)}
                                </span>
                            </div>
                        </div>
                    </SectionCard>
                </div>

            </div>
        </div>
    );
}