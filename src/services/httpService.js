import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: process.env.EndPoint,
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
