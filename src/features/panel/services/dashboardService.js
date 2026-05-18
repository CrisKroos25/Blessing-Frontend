const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('access_token');

const defaultHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
});

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
    throw error;
};

// Normaliza respuestas paginadas { results: [] } o arrays directos
const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.results)) return data.results;
    return [];
};

export const fetchDashboardProducts = async () => {
    const res = await fetch(`${BASE_URL}/inventory/items/`, {
        headers: defaultHeaders(),
    });
    return toArray(await handleResponse(res));
};

export const fetchDashboardSales = async () => {
    const res = await fetch(`${BASE_URL}/sales/list`, {
        headers: defaultHeaders(),
    });
    return toArray(await handleResponse(res));
};

export const fetchDashboardPurchases = async () => {
    const res = await fetch(`${BASE_URL}/commerce/purchases/`, {
        headers: defaultHeaders(),
    });
    return toArray(await handleResponse(res));
};
