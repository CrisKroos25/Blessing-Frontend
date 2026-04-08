// ============================================================
// BodyForm.jsx
// ------------------------------------------------------------
// Este componente agrupa todas las secciones del formulario.
// Su responsabilidad es simple: renderizar las secciones
// y pasarles los datos y el manejador de cambios.
//
// Nota: no necesita useState ni useEffect propios,
// porque no maneja lógica — solo distribuye props.
// ============================================================

import GeneralInfoSection from './sectionsBody/GeneralInfoSection';
import InventorySection from './sectionsBody/InventorySection';
import PricingSection from './sectionsBody/PricingSection';
import ImageSection from './sectionsBody/ImageSection';
import MaterialsSection from './sectionsBody/MaterialsSection';

export default function BodyForm({
    formData,
    handleChange,
    lockType,
    allProducts,
    errors = {},
}) {
    return (
        <>
            {/* Sección 1: Nombre, descripción, categoría y tipo */}
            <GeneralInfoSection
                formData={formData}
                handleChange={handleChange}
                lockType={lockType}
                errors={errors}
            />

            {/* Sección 2: Stock y unidades */}
            <InventorySection
                formData={formData}
                handleChange={handleChange}
                errors={errors}
            />

            {/* Sección 3: Precios */}
            <PricingSection
                formData={formData}
                handleChange={handleChange}
                errors={errors}
            />

            {/* Sección 4: Imágenes del producto */}
            <ImageSection
                formData={formData}
                handleChange={handleChange}
                errors={errors}
            />

            {/* Solo visible si el producto es un arreglo final */}
            {formData.type === 'bundle' && (
                <MaterialsSection
                    formData={formData}
                    handleChange={handleChange}
                    allProducts={allProducts}
                />
            )}
        </>
    );
}
