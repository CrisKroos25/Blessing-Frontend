import styles from './DashboardLayout.module.css';
import { Box, TriangleAlert, PiggyBank, Boxes, Clock, BarChart2 } from 'lucide-react';

import MetricCard from '../components/MetricCard/MetricCard';
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
    const formatQ = (v) => `Q${Number(v).toFixed(2)}`;

    return (
        <div className={styles.layout}>

            {/* ── Métricas ── */}
            <div className={styles.metricsRow}>
                <MetricCard
                    icon={Box}
                    value={metrics.controlled}
                    label="Productos controlados"
                    sub="12 categorías"
                    status="warning"
                />
                <MetricCard
                    icon={TriangleAlert}
                    value={metrics.lowStock}
                    label="Stock bajo"
                    sub={`${metrics.criticalStock} alertas críticas`}
                    status="lower"
                />
                <MetricCard
                    icon={PiggyBank}
                    value={formatQ(metrics.totalValue)}
                    label="Valor del inventario"
                    sub="Precio de compra acumulado"
                    status="okey"
                />
                <MetricCard
                    icon={Boxes}
                    value={metrics.bundles}
                    label="Arreglos activos"
                    sub="Tipos ensamblados"
                    status="info"
                />
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
