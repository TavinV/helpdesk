// src/hooks/useTechnicianTickets.js
import { useState, useCallback } from "react";
import api from "../services/api.js";

const useTechnicianTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTickets = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });

            const res = await api.get(`/tickets?${queryParams}`);
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
    }, []);

    const acceptTicket = useCallback(async (ticketId) => {
        setLoading(true);
        try {
            const res = await api.patch(`/tickets/accept/${ticketId}`);
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Erro ao aceitar ticket");
        } finally {
            setLoading(false);
        }
    }, []);

    const resolveTicket = useCallback(async (ticketId, solution) => {
        setLoading(true);
        try {
            const res = await api.patch(`/tickets/resolve/${ticketId}`, { solution });
            return res.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Erro ao resolver ticket");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        tickets,
        loading,
        error,
        fetchTickets,
        acceptTicket,
        resolveTicket,
        setError,
        setTickets
    };
};

export default useTechnicianTickets;