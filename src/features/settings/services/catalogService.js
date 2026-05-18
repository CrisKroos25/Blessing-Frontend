// features/settings/services/catalogService.js

const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('access_token');

const defaultHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

const handleResponse = async (res) => {
    if (res.status === 204) return true;
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;

    let message;
    if (data?.detail) {
        message = data.detail;
    } else if (data && typeof data === 'object') {
        message = Object.entries(data)
            .map(([field, errors]) => {
                const fieldErrors = Array.isArray(errors)
                    ? errors.join(', ')
                    : String(errors);
                return `${field}: ${fieldErrors}`;
            })
            .join(' | ');
    } else {
        message = `HTTP ${res.status}`;
    }
    throw new Error(message);
};

// ── Categorías ──────────────────────────────────────────────────────────────

export async function fetchCategories() {
    const res = await fetch(`${BASE_URL}/catalog/categories/`, {
        headers: defaultHeaders(),
    });
    return handleResponse(res);
}

export async function createCategory(name, item_type) {
    const res = await fetch(`${BASE_URL}/catalog/categories/`, {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify({ name, item_type }),
    });
    return handleResponse(res);
}

export async function deleteCategory(id) {
    const res = await fetch(`${BASE_URL}/catalog/categories/${id}/`, {
        method: 'DELETE',
        headers: defaultHeaders(),
    });
    return handleResponse(res);
}

// ── Unidades ────────────────────────────────────────────────────────────────

export async function fetchUnits() {
    const res = await fetch(`${BASE_URL}/catalog/units/`, {
        headers: defaultHeaders(),
    });
    return handleResponse(res);
}

export async function createUnit(name) {
    const res = await fetch(`${BASE_URL}/catalog/units/`, {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify({ name }),
    });
    return handleResponse(res);
}

export async function deleteUnit(id) {
    const res = await fetch(`${BASE_URL}/catalog/units/${id}/`, {
        method: 'DELETE',
        headers: defaultHeaders(),
    });
    return handleResponse(res);
}
