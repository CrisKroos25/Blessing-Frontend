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

import GeneralInfoSection from './sections/GeneralInfoSection';
import InventorySection from './sections/InventorySection';
import PricingSection from './sections/PricingSection';
import ImageSection from './sections/ImageSection';

export default function BodyForm({ formData, handleChange }) {
    return (
        <>
            {/* Sección 1: Nombre, descripción, categoría y tipo */}
            <GeneralInfoSection
                formData={formData}
                handleChange={handleChange}
            />

            {/* Sección 2: Stock y unidades */}
            <InventorySection formData={formData} handleChange={handleChange} />

            {/* Sección 3: Precios */}
            <PricingSection formData={formData} handleChange={handleChange} />

            {/* Sección 4: Imágenes del producto */}
            <ImageSection formData={formData} handleChange={handleChange} />
        </>
    );
}
