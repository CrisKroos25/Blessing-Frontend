const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('access_token');

const parseJSONSafe = async (res) => {
    const text = await res.text();
    try {
        return text ? JSON.parse(text) : null;
    } catch {
        return null;
    }
};

const handleResponse = async (res) => {
    const data = await parseJSONSafe(res);
    if (res.ok) return data;
    const message =
        (data && (data.detail || data.message)) || `HTTP ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
};

const defaultHeaders = (json = true) => {
    const headers = {};
    if (json) headers['Content-Type'] = 'application/json';
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

const getCSRFFromCookies = () => {
    const match = document.cookie.match(/(^|; )csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[2]) : null;
};

const request = async (path, options = {}) => {
    const url = `${BASE_URL}${path}`;
    const token = getToken();
    const credentials = token ? undefined : 'include';
    const res = await fetch(url, { credentials, ...options });
    return handleResponse(res);
};

const postHeaders = () => {
    const headers = defaultHeaders();
    if (!getToken()) {
        const csrf = getCSRFFromCookies();
        if (csrf) headers['X-CSRFToken'] = csrf;
    }
    return headers;
};

// ── Proveedores ────────────────────────────────────────────
export async function fetchSuppliers() {
    return request('/commerce/purchases/suppliers/', {
        headers: defaultHeaders(),
    });
}

export async function createSupplier(payload) {
    return request('/commerce/purchases/suppliers/', {
        method: 'POST',
        headers: postHeaders(),
        body: JSON.stringify(payload),
    });
}

export async function updateSupplier(id, payload) {
    return request(`/commerce/purchases/suppliers/${id}/`, {
        method: 'PUT',
        headers: postHeaders(),
        body: JSON.stringify(payload),
    });
}

export async function deactivateSupplier(id) {
    return request(`/commerce/purchases/suppliers/${id}/`, {
        method: 'PATCH',
        headers: postHeaders(),
        body: JSON.stringify({ is_active: false }),
    });
}

export async function reactivateSupplier(id) {
    return request(`/commerce/purchases/suppliers/${id}/`, {
        method: 'PATCH',
        headers: postHeaders(),
        body: JSON.stringify({ is_active: true }),
    });
}

export async function deleteSupplier(id) {
    return request(`/commerce/purchases/suppliers/${id}/`, {
        method: 'DELETE',
        headers: postHeaders(),
    });
}

// ── Lugares de compra ──────────────────────────────────────
export async function fetchPlaces() {
    return request('/commerce/purchases/places/', {
        headers: defaultHeaders(),
    });
}

export async function createPlace(payload) {
    return request('/commerce/purchases/places/', {
        method: 'POST',
        headers: postHeaders(),
        body: JSON.stringify(payload),
    });
}

export async function updatePlace(id, payload) {
    return request(`/commerce/purchases/places/${id}/`, {
        method: 'PUT',
        headers: postHeaders(),
        body: JSON.stringify(payload),
    });
}

export async function deactivatePlace(id) {
    return request(`/commerce/purchases/places/${id}/`, {
        method: 'PATCH',
        headers: postHeaders(),
        body: JSON.stringify({ is_active: false }),
    });
}

export async function reactivatePlace(id) {
    return request(`/commerce/purchases/places/${id}/`, {
        method: 'PATCH',
        headers: postHeaders(),
        body: JSON.stringify({ is_active: true }),
    });
}

export async function deletePlace(id) {
    return request(`/commerce/purchases/places/${id}/`, {
        method: 'DELETE',
        headers: postHeaders(),
    });
}
