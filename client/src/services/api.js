import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://seu-dominio.com/api'
        : 'http://localhost:3000/api/v1',
});

export default api;