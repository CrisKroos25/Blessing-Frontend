import { useMemo, useState } from 'react';
import { usePurchases } from '../hooks/usePurchases';
import { useModalState } from '@/shared/hooks/useModalState';
import styles from './PurchaseRecordView.module.css';
import Modal from '../components/Modal/Modal';
import { Eye, Search, X } from 'lucide-react';

function formatPrice(value) {
    return `Q${Number(value).toFixed(2)}`;
}

export default function PurchaseRecordView() {
    const { purchases } = usePurchases();
    const { modalState, openModal, closeModal } = useModalState();

    const [query, setQuery] = useState('');
    const [month, setMonth] = useState('all');

    // Meses únicos derivados de las compras (formato YYYY-MM para el value,
    // nombre legible para el label)
    const months = useMemo(() => {
        const unique = [
            ...new Set(
                purchases
                    .map((p) => p.date?.slice(0, 7)) // 'YYYY-MM'
                    .filter(Boolean),
            ),
        ].sort().reverse(); // más reciente primero
        return unique;
    }, [purchases]);

    const hasActiveFilters = query.length > 0 || month !== 'all';

    const resetFilters = () => {
        setQuery('');
        setMonth('all');
    };

    const filtered = useMemo(() => {
        return purchases.filter((p) => {
            const origin = (p.supplier?.name || p.place?.name || '').toLowerCase();
            const matchesQuery = origin.includes(query.toLowerCase());
            const matchesMonth = month === 'all' || p.date?.startsWith(month);
            return matchesQuery && matchesMonth;
        });
    }, [purchases, query, month]);

    const formatMonthLabel = (yyyymm) => {
        const [year, m] = yyyymm.split('-');
        const date = new Date(Number(year), Number(m) - 1);
        return date.toLocaleDateString('es-GT', { month: 'long', year: 'numeric' });
    };

    if (purchases.length === 0) {
        return <p className={styles.empty}>No hay compras registradas aún.</p>;
    }

    return (
        <div className={styles.container}>
            {/* ── Filtros ── */}
            <div className={styles.filtersRow}>
                <div className={styles.searchWrapper}>
                    <Search size={14} className={styles.searchIcon} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar proveedor o lugar..."
                        className={styles.searchInput}
                    />
                </div>

                <select
                    className={styles.select}
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                >
                    <option value="all">Todos los meses</option>
                    {months.map((m) => (
                        <option key={m} value={m}>{formatMonthLabel(m)}</option>
                    ))}
                </select>

                {hasActiveFilters && (
                    <button className={styles.resetBtn} onClick={resetFilters}>
                        <X size={14} />
                        <span>Limpiar</span>
                    </button>
                )}
            </div>

            {/* ── Tabla ── */}
            <div className={styles.tableHeader}>
                <span className={styles.tableHeaderCell}>#</span>
                <span className={styles.tableHeaderCell}>Fecha</span>
                <span className={styles.tableHeaderCell}>Proveedor / Lugar</span>
                <span className={styles.tableHeaderCell}>Productos</span>
                <span className={styles.tableHeaderCell}>Total</span>
                <span className={styles.tableHeaderCell}></span>
            </div>

            {filtered.length === 0 ? (
                <p className={styles.empty}>No hay compras que coincidan con los filtros.</p>
            ) : (
                filtered.map((p) => (
                    <div key={p.id} className={styles.tableRow}>
                        <span className={styles.cell}>{p.id}</span>
                        <span className={styles.cell}>{p.date}</span>
                        <span className={styles.cell}>
                            {p.supplier?.name || p.place?.name || '—'}
                        </span>
                        <span className={styles.cell}>{p.details?.length ?? 0}</span>
                        <span className={`${styles.cell} ${styles.total}`}>
                            {formatPrice(p.total)}
                        </span>
                        <span className={styles.cell}>
                            <button
                                onClick={() => openModal('view', p)}
                                className={styles.buttonEye}
                            >
                                <Eye size={18} />
                            </button>
                        </span>
                    </div>
                ))
            )}

            <Modal
                key={modalState.item?.id ?? 'view'}
                modalState={modalState}
                onClose={closeModal}
            />
        </div>
    );
}
