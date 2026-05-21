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

// ── Ítems disponibles para comprar ────────────────────────
export async function fetchPurchaseItems() {
    return request('/commerce/purchases/items/', { headers: defaultHeaders() });
}

// ── Compras ────────────────────────────────────────────────
export async function fetchPurchases() {
    return request('/commerce/purchases/', { headers: defaultHeaders() });
}

export async function createPurchase(payload) {
    return request('/commerce/purchases/', {
        method: 'POST',
        headers: postHeaders(),
        body: JSON.stringify(payload),
    });
}
