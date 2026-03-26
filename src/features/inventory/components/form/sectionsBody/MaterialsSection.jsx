// ============================================================
// MaterialsSection.jsx
// ------------------------------------------------------------
// Sección 5 del formulario — solo visible en productos finales.
// Permite buscar materiales existentes y agregarlos al arreglo
// con su cantidad correspondiente.
// ============================================================

import { useState } from 'react';
import styles from './MaterialsSection.module.css';
import { Search, Plus, Trash2 } from 'lucide-react';

export default function MaterialsSection({
    formData,
    handleChange,
    allProducts = [],
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
        const isFinal = product.type === 'Finales';
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
                <div className={styles.sectionNumber}>5</div>
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
                                        <span className={styles.resultName}>
                                            {product.name}
                                        </span>
                                        <span className={styles.resultCategory}>
                                            {product.category}
                                        </span>
                                    </div>
                                    <Plus
                                        size={16}
                                        className={styles.resultIcon}
                                    />
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
                            <span className={styles.materialName}>
                                {material.name}
                            </span>

                            <div className={styles.materialControls}>
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
                                <button
                                    className={styles.removeButton}
                                    onClick={() =>
                                        handleRemoveMaterial(material.productId)
                                    }
                                >
                                    <Trash2 size={15} />
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
