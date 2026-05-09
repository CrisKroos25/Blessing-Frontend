// src/features/sales/services/saleService.js
const BASE_URL = 'http://localhost:8000/api';

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

const defaultHeaders = (json = true) => {
    const headers = {};
    if (json) headers['Content-Type'] = 'application/json';

    // Solo agrega el token si existe
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    return headers;
};
const usesTokenAuth = () => Boolean(getToken());

const getCSRFFromCookies = () => {
    const match = document.cookie.match(/(^|; )csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[2]) : null;
};

const request = async (path, options = {}) => {
    const url = `${BASE_URL}${path}`;
    const token = getToken();

    // Si no hay token, asumimos session auth y añadimos credentials
    const credentials = token ? undefined : 'include';

    const res = await fetch(url, { credentials, ...options });
    return handleResponse(res);
};

// Exported API

export async function fetchSaleProducts() {
    return request('/sales/products/', {
        method: 'GET',
        headers: defaultHeaders(),
    });
}

export async function fetchSales() {
    return request('/sales/list/', {
        method: 'GET',
        headers: defaultHeaders(),
    });
}

export async function createSale(payload) {
    const token = getToken();
    const headers = defaultHeaders();
    // Si usamos session auth, añadir CSRF
    if (!token) {
        const csrftoken = getCSRFFromCookies();
        if (csrftoken) headers['X-CSRFToken'] = csrftoken;
    }

    return request('/sales/list/', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
}
