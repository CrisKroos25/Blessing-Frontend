// ============================================================
// services/productService.js
// ------------------------------------------------------------
// Capa de servicio: toda la comunicación con el backend vive aquí.
// Cuando el backend cambie de URL o estructura, solo tocamos este archivo.
// El resto del frontend (hooks, componentes) no sabe cómo viajan los datos.
// ============================================================

const BASE_URL = 'http://localhost:8000/api';

// ── Helper ──────────────────────────────────────────────────
const handleResponse = async (res) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message =
            errorData.detail ||
            errorData.error ||
            Object.values(errorData)[0] ||
            `Error ${res.status}`;
        throw new Error(message);
    }
    if (res.status === 204) return true;
    return res.json();
};

// ── GET /api/inventory/items/ ───────────────────────────────
export const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/inventory/items/`);
    return handleResponse(res);
};

// ── POST /api/inventory/items/ ──────────────────────────────
export const createProduct = async (formData) => {
    const { materials, image, ...itemData } = formData;

    const mappedMaterials = materials.map((m) => ({
        item: m.productId,
        quantity: m.quantity,
    }));

    const data = new FormData();

    // Agregamos todos los campos de texto
    Object.entries({ ...itemData, materials: JSON.stringify(mappedMaterials) }).forEach(
        ([key, value]) => data.append(key, value)
    );

    // Solo agregamos image si es un File real — nunca un string vacío
    if (image instanceof File) {
        data.append('image', image);
    }

    const res = await fetch(`${BASE_URL}/inventory/items/`, {
        method: 'POST',
        // Sin Content-Type — el browser lo pone solo con el boundary correcto
        body: data,
    });

    return handleResponse(res);
};

// ── PUT /api/inventory/items/:id/ ───────────────────────────
export const updateProduct = async (id, formData) => {
    const { materials, image, ...itemData } = formData;

    const data = new FormData();

    Object.entries(itemData).forEach(([key, value]) => data.append(key, value));

    if (image instanceof File) {
        data.append('image', image);
    }

    const res = await fetch(`${BASE_URL}/inventory/items/${id}/`, {
        method: 'PUT',
        body: data,
    });

    const updatedItem = await handleResponse(res);

    if (formData.type === 'bundle' && materials?.length > 0) {
        await saveBundleMaterials(id, materials);
    }

    return updatedItem;
};

// ── DELETE /api/inventory/items/:id/ ────────────────────────
export const deleteProduct = async (id) => {
    const res = await fetch(`${BASE_URL}/inventory/items/${id}/`, {
        method: 'DELETE',
    });
    return handleResponse(res);
};

// ── Helper: guardar materiales de un bundle ─────────────────
const saveBundleMaterials = async (bundleId, materials) => {
    const res = await fetch(`${BASE_URL}/inventory/bundles/${bundleId}/materials/`, {
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

// ── GET /api/inventory/items/:id/materials/ ──────────────────
export const fetchBundleMaterials = async (itemId) => {
    const res = await fetch(`${BASE_URL}/inventory/items/${itemId}/materials/`);
    return handleResponse(res);
};
