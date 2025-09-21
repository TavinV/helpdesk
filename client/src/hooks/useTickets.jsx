import { useState, useCallback } from "react";
import api from "../services/api.js";

export function useTickets(userId) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTickets = useCallback(async (filters = {}) => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try {
            const query = new URLSearchParams({ user: userId, ...filters }).toString();
            const res = await api.get(`/tickets?${query}`);
            if (res.data.success) {
                setTickets(res.data.data);
            } else {
                setError(res.data.message || "Erro ao carregar tickets");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao carregar tickets");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const createTicket = useCallback(async (ticketData) => {
        try {
            const res = await api.post("/tickets", ticketData);
            if (res.data.success) {
                setTickets(prev => [res.data.data, ...prev]);
            }
            return res.data;
        } catch (err) {
            throw err.response?.data || { message: "Erro ao criar ticket" };
        }
    }, []);

    const updateTicket = useCallback(async (ticketId, updates) => {
        try {
            const res = await api.put(`/tickets/${ticketId}`, updates);
            if (res.data.success) {
                setTickets(prev => prev.map(t => t._id === ticketId ? res.data.data : t));
            }
            return res.data;
        } catch (err) {
            throw err.response?.data || { message: "Erro ao atualizar ticket" };
        }
    }, []);

    const deleteTicket = useCallback(async (ticketId) => {
        try {
            await api.delete(`/tickets/${ticketId}`);
            setTickets(prev => prev.filter(t => t._id !== ticketId));
        } catch (err) {
            throw err.response?.data || { message: "Erro ao excluir ticket" };
        }
    }, []);

    return {
        tickets,
        loading,
        error,
        fetchTickets,
        createTicket,
        updateTicket,
        deleteTicket,
        setTickets // útil se precisar manipular diretamente
    };
}
