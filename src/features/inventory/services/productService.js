// ============================================================
// services/productService.js
// ------------------------------------------------------------
// Capa de servicio: toda la comunicación con el backend vive aquí.
// Cuando el backend cambie de URL o estructura, solo tocamos este archivo.
// El resto del frontend (hooks, componentes) no sabe cómo viajan los datos.
// ============================================================

const BASE_URL = 'http://localhost:8000/api';

// ── Helper ──────────────────────────────────────────────────
// Centraliza el manejo de errores HTTP para no repetirlo
// en cada función. Si la respuesta no es ok, lanza un error
// con el mensaje que devuelve el backend.
const handleResponse = async (res) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail ?? `Error ${res.status}`);
    }
    // DELETE devuelve 204 sin body — no intentamos parsear JSON
    if (res.status === 204) return true;
    return res.json();
};

// ── GET /api/items/ ─────────────────────────────────────────
// Trae todos los items activos del inventario
export const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/items/`);
    return handleResponse(res);
};

// ── POST /api/items/ ────────────────────────────────────────
// Crea un nuevo item — si es bundle también envía sus materiales
export const createProduct = async (formData) => {
    const { materials, ...itemData } = formData;

    const res = await fetch(`${BASE_URL}/items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
    });

    const newItem = await handleResponse(res);

    // Si es bundle y tiene materiales, los guardamos en bundledetail
    if (formData.type === 'bundle' && materials?.length > 0) {
        await saveBundleMaterials(newItem.id, materials);
    }

    return newItem;
};

// ── PUT /api/items/:id/ ─────────────────────────────────────
// Actualiza un item existente
export const updateProduct = async (id, formData) => {
    const { materials, ...itemData } = formData;

    const res = await fetch(`${BASE_URL}/items/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
    });

    const updatedItem = await handleResponse(res);

    // Si es bundle, reemplazamos los materiales
    if (formData.type === 'bundle' && materials?.length > 0) {
        await saveBundleMaterials(id, materials);
    }

    return updatedItem;
};

// ── DELETE /api/items/:id/ ──────────────────────────────────
// Elimina un item (o soft delete si el backend lo maneja)
export const deleteProduct = async (id) => {
    const res = await fetch(`${BASE_URL}/items/${id}/`, {
        method: 'DELETE',
    });
    return handleResponse(res);
};

// ── Helper: guardar materiales de un bundle ─────────────────
// Llama al endpoint de bundles para guardar los materiales
// que componen un arreglo
const saveBundleMaterials = async (bundleId, materials) => {
    const res = await fetch(`${BASE_URL}/bundles/${bundleId}/materials/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            materials.map((m) => ({
                item: m.productId,
                quantity: m.quantity,
            })),
        ),
    });
    return handleResponse(res);
};

// ── GET /api/items/:id/materials ─────────────────────────────────
// Obtiene los materiales de un bundle
export const fetchBundleMaterials = async (itemId) => {
    const res = await fetch(`${BASE_URL}/items/${itemId}/materials/`);
    return handleResponse(res);
};
