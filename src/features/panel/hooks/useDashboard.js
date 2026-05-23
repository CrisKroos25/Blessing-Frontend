import { useState, useEffect, useMemo } from 'react';
import {
    fetchDashboardProducts,
    fetchDashboardSales,
    fetchDashboardPurchases,
} from '../services/dashboardService';

export function useDashboard() {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const [p, s, c] = await Promise.all([
                    fetchDashboardProducts(),
                    fetchDashboardSales(),
                    fetchDashboardPurchases(),
                ]);
                setProducts(p ?? []);
                setSales(s ?? []);
                setPurchases(c ?? []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    // ── Métricas de inventario ───────────────────────────────
    const metrics = useMemo(() => {
        const controlled = products.filter((p) => p.type === 'product').length;
        const lowStock = products.filter(
            (p) => p.stock < p.min_stock && p.stock !== 0,
        ).length;
        const criticalStock = products.filter((p) => p.stock === 0).length;
        const totalValue = products.reduce(
            (acc, p) => acc + Number(p.sell_price || 0) * Number(p.stock || 0),
            0,
        );
        const bundles = products.filter((p) => p.type === 'bundle').length;

        return { controlled, lowStock, criticalStock, totalValue, bundles };
    }, [products]);

    // ── Alertas de stock bajo ────────────────────────────────
    const stockAlerts = useMemo(() => {
        return products
            .filter((p) => p.stock < p.min_stock)
            .sort((a, b) => a.stock - b.stock)
            .slice(0, 5);
    }, [products]);

    // ── Actividad reciente (mezcla ventas + compras) ─────────
    const recentActivity = useMemo(() => {
        const saleItems = sales.slice(0, 8).map((s) => ({
            id: `sale-${s.id}`,
            type: 'sale',
            label: `Venta #${s.id}${s.customer_name ? ` — ${s.customer_name}` : ''}`,
            amount: s.total,
            date: s.created_at || s.date,
        }));

        const purchaseItems = purchases.slice(0, 4).map((p) => ({
            id: `purchase-${p.id}`,
            type: 'purchase',
            label: `Compra #${p.id}${p.supplier?.name ? ` — ${p.supplier.name}` : p.place?.name ? ` — ${p.place.name}` : ''}`,
            amount: p.total,
            date: p.date,
        }));

        return [...saleItems, ...purchaseItems]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 8);
    }, [sales, purchases]);

    // ── Ventas del mes por categoría ─────────────────────────
    const salesByCategory = useMemo(() => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthlySales = sales.filter(
            (s) => (s.created_at || s.date || '').startsWith(currentMonth),
        );

        const map = {};
        monthlySales.forEach((s) => {
            (s.details || s.items || []).forEach((d) => {
                const cat = d.category || d.item_category || 'Sin categoría';
                map[cat] = (map[cat] || 0) + Number(d.subtotal || 0);
            });
        });

        const entries = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 4);
        const max = entries[0]?.[1] || 1;
        return entries.map(([name, total]) => ({ name, total, pct: Math.round((total / max) * 100) }));
    }, [sales]);

    // ── Totales del mes ──────────────────────────────────────
    const monthTotals = useMemo(() => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthSalesTotal = sales
            .filter((s) => (s.created_at || s.date || '').startsWith(currentMonth))
            .reduce((acc, s) => acc + Number(s.total || 0), 0);
        const monthPurchasesTotal = purchases
            .filter((p) => (p.date || '').startsWith(currentMonth))
            .reduce((acc, p) => acc + Number(p.total || 0), 0);
        return { sales: monthSalesTotal, purchases: monthPurchasesTotal };
    }, [sales, purchases]);

    return {
        isLoading,
        error,
        metrics,
        stockAlerts,
        recentActivity,
        salesByCategory,
        monthTotals,
    };
}