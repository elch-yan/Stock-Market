import axios from 'axios';

const baseURL = ['development', ''].includes(process.env.NODE_ENV) ? 'http://localhost:3002/api' : 'Yet to be implemented...';

const axiosInstance = axios.create({ 
    baseURL
});

export default axiosInstance;