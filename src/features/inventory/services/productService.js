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

        // Construimos un mensaje legible desde la respuesta del backend
        const message =
            errorData.detail ||
            errorData.error ||
            Object.values(errorData)[0] || // primer campo de error de validación
            `Error ${res.status}`;

        throw new Error(message);
    }

    if (res.status === 204) return true;
    return res.json();
};

const buildFormData = (formData) => {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        if (key === 'materials') return;

        if (key === 'image') {
            if (value instanceof File) {
                data.append('image', value); // imagen nueva
            } else if (value === null) {
                data.append('remove_image', 'true'); // señal para borrar
            }
            // si es string (URL del backend) no tocamos nada
            return;
        }

        if (value !== null && value !== undefined) {
            data.append(key, value);
        }
    });

    return data;
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
    const data = buildFormData(itemData);

    // Los materiales van como JSON en un campo aparte dentro del FormData
    if (materials?.length > 0) {
        const mappedMaterials = materials.map((m) => ({
            item: m.productId,
            quantity: m.quantity,
        }));
        data.append('materials', JSON.stringify(mappedMaterials));
    }

    const res = await fetch(`${BASE_URL}/items/`, {
        method: 'POST',
        // Sin Content-Type — el navegador lo setea automáticamente
        // con el boundary correcto para multipart/form-data
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: data,
    });

    return handleResponse(res);
};

// ── PUT /api/items/:id/ ─────────────────────────────────────
// Actualiza un item existente
export const updateProduct = async (id, formData) => {
    const { materials, ...itemData } = formData;
    const data = buildFormData(itemData);

    const res = await fetch(`${BASE_URL}/items/${id}/`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: data,
    });

    const updatedItem = await handleResponse(res);

    // Materiales se actualizan por separado igual que antes
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
