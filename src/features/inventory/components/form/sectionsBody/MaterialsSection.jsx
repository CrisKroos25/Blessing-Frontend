// ============================================================
// MaterialsSection.jsx
// ------------------------------------------------------------
// Sección 5 del formulario — solo visible en productos finales.
// Permite buscar materiales existentes y agregarlos al arreglo
// con su cantidad correspondiente.
// ============================================================

import { useState } from 'react';
import styles from './MaterialsSection.module.css';
import { Search, Plus, Trash2, Package, CircleAlert } from 'lucide-react';

export default function MaterialsSection({
    formData,
    handleChange,
    allProducts = [],
    errors = {},
}) {
    const [search, setSearch] = useState('');
    const [showResults, setShowResults] = useState(false);

    // Filtramos los productos disponibles según lo que escribe el usuario.
    // Excluimos productos finales (no puedes meter un arreglo dentro de otro)
    // y los que ya fueron agregados al arreglo actual.
    const searchResults = allProducts.filter((product) => {
        const alreadyAdded = formData.materials?.some(
            (m) => m.productId === product.id,
        );
        const isFinal = product.type === 'bundle' || product.type === 'supply';
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesSearch && !alreadyAdded && !isFinal;
    });

    // Agrega un material al arreglo con cantidad 1 por defecto
    const handleAddMaterial = (product) => {
        const newMaterial = {
            productId: product.id,
            name: product.name,
            quantity: 1,
        };

        handleChange({
            target: {
                name: 'materials',
                value: [...(formData.materials ?? []), newMaterial],
            },
        });

        // Limpiamos el buscador después de agregar
        setSearch('');
        setShowResults(false);
    };

    // Actualiza la cantidad de un material ya agregado
    const handleQuantityChange = (productId, quantity) => {
        handleChange({
            target: {
                name: 'materials',
                value: formData.materials.map((m) =>
                    m.productId === productId
                        ? { ...m, quantity: Number(quantity) }
                        : m,
                ),
            },
        });
    };

    // Elimina un material del arreglo
    const handleRemoveMaterial = (productId) => {
        handleChange({
            target: {
                name: 'materials',
                value: formData.materials.filter(
                    (m) => m.productId !== productId,
                ),
            },
        });
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionNumber}>2</div>
                <div className={styles.sectionTitle}>
                    Materiales del arreglo
                </div>
            </div>

            {/* Buscador */}
            <div className={styles.searchWrapper}>
                <div className={styles.searchBox}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        className={styles.searchInput}
                        placeholder="Buscar material por nombre..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowResults(e.target.value.length > 0);
                        }}
                        onFocus={() => setShowResults(search.length > 0)}
                        onBlur={() =>
                            // Pequeño delay para que el click en resultado funcione
                            setTimeout(() => setShowResults(false), 150)
                        }
                    />
                </div>
                {errors.materials && (
                    <div className={styles.errorText}>
                        {<CircleAlert size={12} />} {errors.materials}
                    </div>
                )}

                {/* Resultados del buscador */}
                {showResults && (
                    <div className={styles.searchResults}>
                        {searchResults.length === 0 ? (
                            <div className={styles.noResults}>
                                Sin resultados para "{search}"
                            </div>
                        ) : (
                            searchResults.map((product) => (
                                <div
                                    key={product.id}
                                    className={styles.resultItem}
                                    onClick={() => handleAddMaterial(product)}
                                >
                                    <div className={styles.resultInfo}>
                                        <div className={styles.resultHeader}>
                                            <Package
                                                size={14}
                                                className={styles.itemIcon}
                                            />
                                            <span className={styles.resultName}>
                                                {product.name}
                                            </span>
                                        </div>
                                        <div className={styles.resultDetails}>
                                            <span
                                                className={styles.badgeCategory}
                                            >
                                                {product.category}
                                            </span>
                                            <span
                                                className={`${styles.badgeStock} ${product.stock <= (product.min_stock || 0) ? styles.noStock : ''}`}
                                            >
                                                Stock: {product.stock ?? 0}{' '}
                                                {product.unit ?? ''}
                                            </span>
                                        </div>
                                    </div>
                                    <button className={styles.addButton}>
                                        <Plus size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Lista de materiales agregados */}
            {formData.materials?.length > 0 ? (
                <div className={styles.materialsList}>
                    {formData.materials.map((material) => (
                        <div
                            key={material.productId}
                            className={styles.materialItem}
                        >
                            <div className={styles.materialInfo}>
                                <div className={styles.materialHeader}>
                                    <Package
                                        size={14}
                                        className={styles.itemIcon}
                                    />
                                    <span className={styles.materialName}>
                                        {material.name}
                                    </span>
                                </div>
                                <span className={styles.materialStock}>
                                    {(() => {
                                        const p = allProducts.find(
                                            (x) => x.id === material.productId,
                                        );
                                        if (!p) return null;
                                        return (
                                            <>
                                                Disponible:{' '}
                                                <span
                                                    className={
                                                        p.stock <
                                                        material.quantity
                                                            ? styles.lowStockText
                                                            : styles.normalStockText
                                                    }
                                                >
                                                    {p.stock ?? 0}{' '}
                                                    {p.unit ?? ''}
                                                </span>
                                            </>
                                        );
                                    })()}
                                </span>
                            </div>

                            <div className={styles.materialControls}>
                                <div className={styles.quantityWrapper}>
                                    <span className={styles.quantityLabel}>
                                        Cant:
                                    </span>
                                    <input
                                        type="number"
                                        min="1"
                                        className={styles.quantityInput}
                                        value={material.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                material.productId,
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <button
                                    className={styles.removeButton}
                                    onClick={() =>
                                        handleRemoveMaterial(material.productId)
                                    }
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyMaterials}>
                    Agrega materiales usando el buscador
                </div>
            )}
        </section>
    );
}
