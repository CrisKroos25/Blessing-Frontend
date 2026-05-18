import { RefreshCw, LayoutDashboard } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import DashboardLayout from '../sectionsPage/DashboardLayout';
import styles from './PanelPage.module.css';

export default function PanelPage() {
    const {
        isLoading,
        error,
        metrics,
        recentActivity,
        stockAlerts,
        salesByCategory,
        monthTotals,
    } = useDashboard();

    if (isLoading) {
        return (
            <div className={styles.containerEmpty}>
                <RefreshCw size={28} className={styles.spinner} />
                <span>Cargando panel...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.containerEmpty}>
                <LayoutDashboard size={28} />
                <span>No se pudo cargar el panel</span>
            </div>
        );
    }

    return (
        <DashboardLayout
            metrics={metrics}
            recentActivity={recentActivity}
            stockAlerts={stockAlerts}
            salesByCategory={salesByCategory}
            monthTotals={monthTotals}
        />
    );
}
