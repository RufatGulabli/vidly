import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './shared/like';
import Table from './shared/table';


class MoviesTable extends Component {

    columns = [
        {
            path: 'title',
            label: 'Title',
            content: movie => (<Link to={`/movies/${movie._id}`}>{movie.title}</Link>)
        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Fee' },
        {
            key: 'like',
            content: movie => <Like like={movie.like} onClick={() => this.props.onLike(movie)} />
        },
        {
            key: 'delete',
            content: movie => (<button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button>)
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