// src/hooks/useAuth.js
import { useState } from 'react';
import api from '../services/api.js'; // ajuste o caminho conforme sua estrutura

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            const data = response.data.data;

            if (response.data) {
                // Salvar o token JWT
                if (data.token) {
                    localStorage.setItem('jwtToken', data.token);

                    // Configurar o token como padrão para todas as requisições axios
                    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                }

                // Salvar informações do usuário se necessário
                if (data.user) {
                    localStorage.setItem('userData', JSON.stringify(data.user));
                }

                return { success: true, data };
            } else {
                setError(data.message || 'Algo deu errado durante o login');
                return { success: false, error: data.message };
            }
        } catch (err) {
            // Tratamento de erro específico do axios
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Erro de conexão';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // Remover token e dados do usuário
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');

        // Remover o header de autorização do axios
        delete api.defaults.headers.common['Authorization'];
    };

    // Verificar se há um token salvo e configurar o axios
    const initializeAuth = () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    };

    const getToken = () => {
        return localStorage.getItem('jwtToken');
    };

    const getUserData = () => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    };

    const isAuthenticated = () => {
        const token = getToken();
        // Verifica se o token existe e não está expirado (se você tiver expiração)
        if (!token) return false;

        // Verificação básica de expiração do token JWT (se necessário)
        // Você pode implementar uma verificação mais robusta se precisar
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    };

    return {
        login,
        logout,
        initializeAuth,
        getToken,
        getUserData,
        isAuthenticated,
        loading,
        error,
        clearError: () => setError(null),
    };
};

export default useAuth;