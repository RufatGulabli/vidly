import http from '../services/httpService';

export function getMovies() {
    return http.get('/movies');
}

export function getMovie(movieId) {
    return http.get(`/movies/${movieId}`);
}

export function saveMovie(movie) {
    return http.post('/movies', movie);
}

export function editMovie(movie) {
    return http.put(`/movies/${movie._id}`, movie);
}

export function deleteMovie(movieId) {
    return http.delete(`/movies/${movieId}`);
}