import http from '../services/httpService';

export function register(user) {
    return http.post('/register', user);
}