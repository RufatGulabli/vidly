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
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import loginService from '../services/loginService';
import rentalService from "../services/rentalService";

class Movies extends Component {
  state = {
    movies: [],
    sortColumn: { path: 'title', order: 'asc' },
    categories: [],
    selectedCategory: '0',
    currentPage: 1,
    pageSize: 7,
    searchQuery: '',
    showModal: false,
    selectedMovie: {},
    dateReturned: ''
  };

  async componentDidMount() {
    try {
      const { data: genres } = await getGenres();
      const { data: movies } = await getMovies();
      this.setState({ movies, categories: genres });
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    return <div className="mt-4 w-100" > {this.renderMovies()}</div >
  }

  deleteMovie = async id => {
    try {
      await deleteMovie(id);
      const movies = this.state.movies.filter(item => item._id !== id);
      this.setState({ movies });
    } catch (exc) {
      toast.error(exc.response.data.message);
    }
  };

  getMoviesByCategory = categoryId => {
    return categoryId === '0' ?
      this.state.movies :
      this.state.movies.filter(movie => movie.genre._id === categoryId);
  }

  getPagedData = () => {
    const {
      selectedCategory,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery,
      movies
    } = this.state;
    let pagedData = movies;
    if (searchQuery) {
      pagedData = movies.filter(movie => {
        return movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      });
    } else if (selectedCategory) {
      pagedData = this.getMoviesByCategory(selectedCategory);
    }
    const sortedMovies = _.orderBy(pagedData, [sortColumn.path], [sortColumn.order]);
    pagedData = pagination(sortedMovies, currentPage, pageSize);
    return { totalCount: sortedMovies.length, data: pagedData };
  }

  onSearch = value => {
    this.setState({ selectedCategory: '0', searchQuery: value, currentPage: 1 });
  }

  sortHandler = sortColumn => {
    this.setState({ sortColumn });
  }

  categoryClickHandler = categoryID => {
    this.setState({ selectedCategory: categoryID, currentPage: 1, searchQuery: '', movies: this.state.movies });
  }

  changePageHandler = page => {
    this.setState({ currentPage: page });
  }

  newMovieClickHandler = () => {
    this.props.history.push('/movies/new');
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  rentMovie = movie => {
    if (!loginService.getCurrentUser()) {
      this.props.history.push('/login');
    }
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
    const m = this.state.movies.filter(m => m._id === movie._id)[0];
    this.setState({ selectedMovie: m });
  }

  proceedRental = async () => {
    try {
      const rental = {
        customerEmail: loginService.getCurrentUser().email,
        movieId: this.state.selectedMovie._id,
        dateReturned: this.state.dateReturned
      }
      const resp = await rentalService.saveRental(rental);
      if (!resp.error) {
        toast.success('Successfully created.');
      }
    } catch (exc) {
      if (exc.response && exc.response.data) {
        toast.error(exc.response.data.message);
      }
    }
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  getReturnDate = date => {
    const today = new Date().getTime();
    const selectedDate = new Date(date).getTime();
    if (selectedDate - today < 60 * 60 * 24) {
      toast.info('Wrong Date');
      return;
    }
    console.log(today, selectedDate);
    this.setState({ dateReturned: date });
  }

  renderMovies = () => {

    const { currentPage, pageSize, sortColumn, searchQuery: search, showModal, selectedMovie, dateReturned } = this.state;
    const { totalCount, data } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="row w-100">
          <section className="col-3">
            <SideBar
              selectedCategory={this.state.selectedCategory}
              categories={this.state.categories}
              onCategorySelect={this.categoryClickHandler}
            />
          </section>
          <main className="col">
            {(this.props.user && this.props.user.isAdmin) && <div><button onClick={this.newMovieClickHandler} className="btn btn-primary mb-3">New Movie</button></div>}
            <SearchBox value={search} onSearch={this.onSearch} placeholder="Search..." />
            <p className="lead">Showing {totalCount} elements from the database.</p>
            {totalCount === 0 && <p className="lead">There is no any movies in the database</p>}
            <MoviesTable
              sortColumn={sortColumn}
              movies={data}
              onRent={this.rentMovie}
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
        <Modal centered={true} toggle={this.toggleModal} size='md' isOpen={showModal} >
          <ModalBody>
            <div className="row">
              <div className="col-4">
                <img src={selectedMovie.imageUrl} alt="" style={{ width: '150px', height: '220px' }} />
              </div>
              <div className="col-8">
                <div>
                  <label className="col-4 text-right p-0">Title : </label>
                  <span className="col-8 text-left">{selectedMovie.title}</span>
                </div>
                <div>
                  <label className="col-4 text-right p-0">Stock : </label>
                  <span className="col-8 text-left">{selectedMovie.numberInStock}</span>
                </div>
                <div>
                  <label className="col-4 text-right p-0">Rate : </label>
                  <span className="col-8 text-left">{selectedMovie.dailyRentalRate}</span>
                </div>
                <div>
                  <label className="col-4 text-right p-0">Who Rents : </label>
                  <span className="col-8 text-left">{(loginService.getCurrentUser() && loginService.getCurrentUser().name) || ''}</span>
                </div>
                <div className="mt-3">
                  <label className="col-4 text-left p-0">Return Date</label>
                  <input onChange={(e) => this.getReturnDate(e.target.value)} value={dateReturned} type="date" className="form-control w-80" />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={this.proceedRental} className="btn btn-success btn-sm w-50">Rent</button>
            <button onClick={this.toggleModal} className="btn btn-danger btn-sm w-50">Cancel</button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  };

}

export default Movies;
