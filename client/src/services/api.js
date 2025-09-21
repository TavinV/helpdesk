import axios from 'axios';

const api = axios.create({
    baseURL: 'https://helpdesk-b4zs.onrender.com/api/v1/'
});

export default api;