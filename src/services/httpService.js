import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config/config.json';

const instance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'x-auth-token': localStorage.getItem('token')
    }
});

instance.interceptors.response.use(resp => resp, error => {
    const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;
    if (!expectedError) {
        toast.error(error.message);
        return null;
    }
    return Promise.reject(error);
});

export default instance;
