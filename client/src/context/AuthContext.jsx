import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api"; // seu axios configurado

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("userData");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("jwtToken") || null;
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // === LOGIN ===
    const login = async (email, password) => {
        setError(null);
        try {
            const response = await api.post("/auth/login", { email, password });
            const data = response.data.data;

            if (data && data.token) {
                // salvar token e user
                localStorage.setItem("jwtToken", data.token);
                localStorage.setItem("userData", JSON.stringify(data.user));
                api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

                setUser(data.user);
                setToken(data.token);

                return { success: true, user: data.user };
            } else {
                const message = data.message || "Erro no login";
                setError(message);
                return { success: false, error: message };
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || err.message || "Erro de conexão";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // === LOGOUT ===
    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userData");
        setUser(null);
        setToken(null);
        delete api.defaults.headers.common["Authorization"];
    };

    // === INICIALIZAR AUTENTICAÇÃO ===
    useEffect(() => {
        const initializeAuth = async () => {
            const savedToken = localStorage.getItem("jwtToken");
            if (!savedToken) {
                setLoading(false);
                return;
            }

            api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

            try {
                const response = await api.get("/users/me");
                if (response.data.success) {
                    const { _id: userId, role, email, name, cpf, phone, emailVerified } = response.data.data;
                    const userData = { userId, role, email, name, cpf, phone, emailVerified };
                    setUser(userData);
                    setToken(savedToken);
                    localStorage.setItem("userData", JSON.stringify(userData));
                } else {
                    logout();
                }
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const isAuthenticated = () => !!token && !!user;

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                error,
                loading,
                isAuthenticated,
                clearError,
                setError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
    }
    return context;
};
