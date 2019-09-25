import React, { Component } from "react";
import _ from 'lodash';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from "../services/movieService";
import Paginator from "./shared/paginator";
import { pagination } from '../utils/pagination';
import MoviesTable from "./moviesTable";
import SideBar from './shared/sidebar';
import SearchBox from "./searchbox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    filteredMovies: [],
    sortColumn: { path: 'title', order: 'asc' },
    categories: [],
    selectedCategory: '0',
    currentPage: 1,
    pageSize: 6,
    searchQuery: ''
  };

  async componentDidMount() {
    try {
      const { data: genres } = await getGenres();
      const { data: movies } = await getMovies();
      this.setState({ movies, categories: genres, filteredMovies: movies });
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    return <div className="mt-4" > {this.renderMovies()}</div >
  }

  heartClickHandler = movie => {
    console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies, filteredMovies: movies });
  }

  deleteMovie = async id => {
    try {
      console.log(id);
      await deleteMovie(id);
      const updateMovies = this.state.movies.filter(item => item._id !== id);
      this.setState({
        filteredMovies: updateMovies,
        movies: updateMovies,
      });
    } catch (exc) {
      toast.error(exc.response.data.message);
    }
  };

  getMoviesByCategory = categoryId => {
    return categoryId === '0' ?
      this.state.filteredMovies :
      this.state.filteredMovies.filter(movie => movie.genre._id === categoryId);
  }

  getPagedData = () => {
    const { selectedCategory, currentPage, pageSize, sortColumn } = this.state;
    const moviesByCategory = this.getMoviesByCategory(selectedCategory);
    const sortedMovies = _.orderBy(moviesByCategory, [sortColumn.path], [sortColumn.order]);
    const pagedData = pagination(sortedMovies, currentPage, pageSize);
    return { totalCount: moviesByCategory.length, data: pagedData };
  }

  onSearch = value => {
    const filteredMovies = this.state.movies.filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()));
    this.setState({ filteredMovies, selectedCategory: '0', search: value, currentPage: 1 });
  }

  sortHandler = sortColumn => {
    this.setState({ sortColumn });
  }

  categoryClickHandler = categoryID => {
    this.setState({ selectedCategory: categoryID, currentPage: 1, search: '', filteredMovies: this.state.movies });
  }

  changePageHandler = page => {
    this.setState({ currentPage: page });
  }

  newMovieClickHandler = () => {
    this.props.history.push('/movies/new');
  }

  renderMovies = () => {

    const { currentPage, pageSize, sortColumn, searchQuery: search } = this.state;
    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <section className="col-3">
            <SideBar
              selectedCategory={this.state.selectedCategory}
              categories={this.state.categories}
              onCategorySelect={this.categoryClickHandler}
            />
          </section>
          <main className="col">
            <div><button onClick={this.newMovieClickHandler} className="btn btn-primary mb-3">New Movie</button></div>
            <SearchBox value={search} onSearch={this.onSearch} placeholder="Search..." />
            <p className="lead">Showing {totalCount} elements from the database.</p>
            {totalCount === 0 && <p className="lead">There is no any movies in the database</p>}
            <MoviesTable
              sortColumn={sortColumn}
              movies={data}
              onLike={this.heartClickHandler}
              onDelete={this.deleteMovie}
              onSort={this.sortHandler}
            />
            <Paginator
              currentPage={currentPage}
              onPageChange={this.changePageHandler}
              count={totalCount}
              pageSize={pageSize} />
          </main>
        </div>

      </React.Fragment>
    );
  };

}

export default Movies;
