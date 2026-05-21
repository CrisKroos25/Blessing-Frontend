// features/customers/hooks/useCustomers.js

import { useState, useEffect } from 'react';
import {
    fetchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from '../services/customerService';

export function useCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        setLoading(true);
        try {
            const data = await fetchCustomers();
            setCustomers(Array.isArray(data) ? data : (data?.results ?? []));
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const create = async (data) => {
        const created = await createCustomer(data);
        setCustomers((prev) => [created, ...prev]);
    };

    const update = async (id, data) => {
        const updated = await updateCustomer(id, data);
        setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
    };

    const remove = async (id) => {
        await deleteCustomer(id);
        setCustomers((prev) => prev.filter((c) => c.id !== id));
    };

    return { customers, loading, error, create, update, remove };
}
