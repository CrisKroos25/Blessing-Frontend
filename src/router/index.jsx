import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import InventoryPage from '../features/inventory/pages/InventoryPage';
import PurchasesPage from '../features/purchases/pages/PurchasesPage';
import SalesPage from '../features/sales/pages/SalesPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<SalesPage />}></Route>
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/reports" element={<SalesPage />}></Route>
                <Route path="/settings" element={<SalesPage />}></Route>
            </Route>
        </Routes>
    );
}
