import http from '../services/httpService';

function getRentals() {
    return http.get('/rentals');
}

export default {
    getRentals
}