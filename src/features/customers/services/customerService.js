// features/customers/services/customerService.js

const BASE_URL = 'http://localhost:8000/api';

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

export async function fetchCustomers() {
    const res = await fetch(`${BASE_URL}/customers/`, {
        headers: defaultHeaders(),
    });
    return handleResponse(res);
}

export async function createCustomer(data) {
    const res = await fetch(`${BASE_URL}/customers/`, {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function updateCustomer(id, data) {
    const res = await fetch(`${BASE_URL}/customers/${id}/`, {
        method: 'PUT',
        headers: defaultHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

export async function deleteCustomer(id) {
    const res = await fetch(`${BASE_URL}/customers/${id}/`, {
        method: 'DELETE',
        headers: defaultHeaders(),
    });
    return handleResponse(res);
}
