import http from '../services/httpService';

function getRentals() {
    return http.get('/rentals');
}

function saveRental(rental) {
    return http.post('/rentals', rental);
}

export default {
    getRentals,
    saveRental
}