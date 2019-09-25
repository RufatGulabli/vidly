import * as genresAPI from "./fakeGenreService";
import _ from 'lodash';

let movies = [
  {
    _id: "9y21ca3zeb7f6fbccd471815",
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: true
  },
  {
    _id: "5b20ct1egb7f6fb23d471916",
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b20qw3tyb7f6fbmjd471899",
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "tb21ca3lob7f6fbhhd47181b",
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 4.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "6b21ca3otb7f6fbccd47181f",
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "51b22cb3eeb1h6fb2cd471815",
    title: "Promotheus",
    genre: { _id: "5b21ca3eeb7f6fbccd471821", name: "Science Fiction" },
    numberInStock: 8,
    dailyRentalRate: 5.5,
    publishDate: "2018-08-10T00:00:28.809Z",
    like: true
  },
  {
    _id: "5b21ca3etb7f6fbccd471816",
    title: "Avatar",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 2,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b20ca3eub7d6fb0cd471817",
    title: "Runner",
    genre: { _id: "5b21ca3eeb7f6fbccd471821", name: "Science Fiction" },
    numberInStock: 3,
    dailyRentalRate: 1.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb4f6fbccd471819",
    title: "Godzilla",
    genre: { _id: "5b21ca3eeb7f6fbccd471821", name: "Science Fiction" },
    numberInStock: 7,
    dailyRentalRate: 2.0,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "1b22ca30eb7f6fbcgd43181a",
    title: "Mrs. Daughfawer",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 10,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: true
  },
  {
    _id: "5b21ch3eeb7f6fbccd47181b",
    title: "Second World War",
    genre: { _id: "5b21ca3eeb7f6fbccd471825", name: "War" },
    numberInStock: 15,
    dailyRentalRate: 7.0,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181y",
    title: "Kids",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 1,
    dailyRentalRate: 9.0,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb7f6fbcgd47181f",
    title: "Star Wars 4",
    genre: { _id: "5b21ca3eeb7f6fbccd471821", name: "Science Fiction" },
    numberInStock: 9,
    dailyRentalRate: 4.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  },
  {
    _id: "5b21ca3eeb7f6fbcrd471821",
    title: "LOST",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 2,
    dailyRentalRate: 7.0,
    publishDate: "2018-01-03T19:04:28.809Z",
    like: false
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  const moviesCopy = _.cloneDeep(movies);
  const updatedMovies = moviesCopy.filter(m => m._id !== movie._id);
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genre._id);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  movieInDb.like = false;
  if (!movie._id) {
    movieInDb._id = new Date().toString();
    movieInDb.publishDate = Date.now();
  }
  updatedMovies.push(movieInDb);
  movies = updatedMovies;
  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
