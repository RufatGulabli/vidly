import http from '../services/httpService';

export function getGenres() {
    return http.get('/genres');
}

export function getGenre(genreId) {
    return http.get(`/genres/${genreId}`);
}