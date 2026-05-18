import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PanelPage from '../features/panel/pages/PanelPage';
import SalesPage from '@/features/sales/pages/SalesPage';
import PurchasesPage from '@/features/purchases/pages/PurchasesPage';
import InventoryPage from '@/features/inventory/pages/InventoryPage';
import CustomersPage from '@/features/customers/pages/CustomersPage';
import SettingsPage from '@/features/settings/pages/SettingsPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<PanelPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}
