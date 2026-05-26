// features/sales/components/form/CustomerSearch.jsx

import styles from './CustomerSearch.module.css';
import { Search, X, UserCheck } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function CustomerSearch({
    customers = [],
    onSelect,
    onClear,
    isLinked,
    linkedName,
}) {
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);

    const searchResults = useMemo(() => {
        if (!search.trim()) return [];
        return customers
            .filter(
                (c) =>
                    c.is_active && // ← solo activos
                    (c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.telephone
                            ?.toLowerCase()
                            .includes(search.toLowerCase())),
            )
            .slice(0, 6);
    }, [search, customers]);

    const handleSelect = (customer) => {
        onSelect(customer);
        setSearch(customer.name);
        setShowResults(false);
    };

    const handleClear = () => {
        onClear();
        setSearch('');
        setShowResults(false);
    };

    return (
        <div className={styles.field}>
            <label className={styles.label}>CLIENTE FRECUENTE</label>

            <div className={styles.searchWrapper}>
                <div
                    className={`${styles.searchBox} ${isLinked ? styles.searchBoxLinked : ''}`}
                >
                    <Search size={14} className={styles.searchIcon} />
                    <input
                        className={styles.searchInput}
                        placeholder="Buscar por nombre o teléfono..."
                        value={isLinked ? linkedName : search}
                        onChange={(e) => {
                            if (isLinked) return;
                            setSearch(e.target.value);
                            setShowResults(e.target.value.length > 0);
                        }}
                        onFocus={() =>
                            !isLinked && setShowResults(search.length > 0)
                        }
                        onBlur={() =>
                            setTimeout(() => setShowResults(false), 150)
                        }
                        readOnly={isLinked}
                    />
                    {isLinked && (
                        <span className={styles.linkedBadge}>
                            <UserCheck size={13} />
                            Frecuente
                        </span>
                    )}
                    {isLinked && (
                        <button
                            className={styles.clearBtn}
                            onClick={handleClear}
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Resultados */}
                {showResults && (
                    <div className={styles.searchResults}>
                        {searchResults.length === 0 ? (
                            <div className={styles.noResults}>
                                Sin resultados para "{search}"
                            </div>
                        ) : (
                            searchResults.map((customer) => (
                                <div
                                    key={customer.id}
                                    className={styles.resultItem}
                                    onClick={() => handleSelect(customer)}
                                >
                                    <div className={styles.resultInfo}>
                                        <span className={styles.resultName}>
                                            {customer.name}
                                        </span>
                                        {customer.telephone && (
                                            <span className={styles.resultSub}>
                                                {customer.telephone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <span className={styles.hint}>
                O completa los datos manualmente abajo
            </span>
        </div>
    );
}
