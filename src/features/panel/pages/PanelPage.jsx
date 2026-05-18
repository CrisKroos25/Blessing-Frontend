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

    if (isLoading) return null;

    if (error) return <p className={styles.error}>Error: {error}</p>;

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
