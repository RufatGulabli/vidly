import React from 'react';
import Form from './shared/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres, getGenreById } from '../services/fakeGenreService';
import Joi from 'joi-browser';

class MovieForm extends Form {

    state = {
        data: {
            title: '',
            genre: {
                _id: '',
                name: ''
            },
            numberInStock: 0,
            dailyRentalRate: 0
        },
        editForm: false,
        errors: {}
    }

    componentDidMount() {
        const { history, match } = this.props;
        if (match.params.id === 'new') {
            return;
        }
        else {
            const movie = getMovie(match.params.id);
            if (!movie) {
                return history.replace('/page-not-found');
            }
            this.setState({ data: movie, editForm: true });
        }
    }

    schema = {
        _id: Joi.optional(),
        title: Joi.string().required().min(3),
        genre: Joi.object().keys({
            _id: Joi.string().required(),
            name: Joi.string().required()
        }),
        numberInStock: Joi.number().integer().required().min(1).label('Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate'),
        publishDate: Joi.optional(),
        like: Joi.optional()
    }

    doSubmit = () => {
        const movie = { ...this.state.data };
        const resp = saveMovie(movie);
        if (!resp) {
            console.error('Something went wrong');
            return;
        }
        this.props.history.replace('/movies');
    }

    selectChangeHandler = (value) => {
        const data = { ...this.state.data };
        const selectedGenre = getGenreById(value);
        if (selectedGenre) {
            data.genre = selectedGenre;
            return this.setState({ data, errors: {} });
        }
        data.genre = {};
        return this.setState({ data, errors: { message: 'Genre should be selected.' } });
    }

    render() {
        const { data, errors } = this.state;
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect(getGenres(), 'Genre', data.genre._id, this.selectChangeHandler, '_id', 'name', errors)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}
                    {this.state.editForm ? this.renderButton('btn btn-primary', 'Edit') : this.renderButton('btn btn-primary', 'Create')}
                </form>
            </div>
        );
    }
}

export default MovieForm;