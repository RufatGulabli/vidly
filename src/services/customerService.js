import http from '../services/httpService';

function getCustomers() {
    return http.get('/customers');
}

function deleteCustomer(customerId) {
    return http.delete(`/customers/${customerId}`);
}

export default {
    getCustomers,
    deleteCustomer
}