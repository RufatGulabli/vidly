import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rent from './shared/like';
import Table from './shared/table';
import loginService from '../services/loginService';

class MoviesTable extends Component {

    isAdmin = loginService.getCurrentUser() && loginService.getCurrentUser().isAdmin;
    logggedIn = loginService.getCurrentUser();

    columns = [
        {
            path: 'title',
            label: 'Title',
            content: movie => {
                return this.isAdmin ?
                    (<Link to={`/movies/${movie._id}`}>{movie.title}</Link>)
                    : (<div>{movie.title}</div>)
            }
        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Fee' },
        {
            key: 'like',
            content: movie => (<Rent like={movie.like} onRent={() => this.props.onRent(movie)} />)
        },
        {
            key: 'delete',
            content: movie => {
                return this.isAdmin ?
                    (<button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button>)
                    : null;
            }
        }
    ];

    render() {
        const { movies, sortColumn, onSort } = this.props;
        return (
            <div>
                <Table data={movies} sortColumn={sortColumn} onSort={onSort} columns={this.columns} />
            </div>
        );
    }
}

export default MoviesTable;