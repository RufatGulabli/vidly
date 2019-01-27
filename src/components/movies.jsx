import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  render() {
    return <div className="m-4 p-4">{this.renderMovies()}</div>;
  }

  renderMovies = () => {
    const { length: count } = this.state.movies;
    if (count === 0)
      return <p className="lead">There is no any movies in the database</p>;
    return (
      <React.Fragment>
        <p className="lead">Showning {count} elements from the database.</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleClick(movie._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  handleClick = id => {
    this.setState({
      movies: this.state.movies.filter(item => item._id !== id)
    });
  };
}

export default Movies;
