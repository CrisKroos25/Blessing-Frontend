// features/inventory/services/catalogService.js

const BASE_URL = 'http://localhost:8000/api';

const getToken = () => localStorage.getItem('access_token');

const defaultHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

export async function fetchCategories(itemType = null) {
    const url = itemType
        ? `${BASE_URL}/catalog/categories/?type=${itemType}`
        : `${BASE_URL}/catalog/categories/`;
    const res = await fetch(url, { headers: defaultHeaders() });
    return res.json();
}

export async function fetchUnits() {
    const res = await fetch(`${BASE_URL}/catalog/units/`, {
        headers: defaultHeaders(),
    });
    return res.json();
}
