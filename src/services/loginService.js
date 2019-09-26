import http from '../services/httpService';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

async function login(user) {
    const { data: jwt } = await http.post('/login', user);
    localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

function logout() {
    localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
    try {
        const token = localStorage.getItem(tokenKey);
        return jwtDecode(token);
    } catch (exc) {
        return null;
    }
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
}