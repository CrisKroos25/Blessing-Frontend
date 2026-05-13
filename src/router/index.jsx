import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import InventoryPage from '../features/inventory/pages/InventoryPage';
import PurchasesPage from '../features/purchases/pages/PurchasesPage';
import SalesPage from '../features/sales/pages/SalesPage';
import PanelPage from '../features/panel/pages/PanelPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<PanelPage />} />
                <Route path="/home" element={<PanelPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/reports" element={<SalesPage />} />
                <Route path="/settings" element={<SalesPage />} />
            </Route>
        </Routes>
    );
}
