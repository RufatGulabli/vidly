import React from 'react';
import Form from './shared/form';
import { getMovie, saveMovie, editMovie } from '../services/movieService';
import { getGenres, getGenre } from '../services/genreService';
import Joi from 'joi-browser';
import { toast } from "react-toastify";

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
        genres: [],
        editForm: false,
        errors: {}
    }

    async componentDidMount() {
        try {
            const { history, match } = this.props;
            const { data: genres } = await getGenres();
            this.setState({ genres });
            if (match.params.id === 'new') {
                return;
            }
            else {
                const { data: movie } = await getMovie(match.params.id);
                if (!movie) {
                    return history.replace('/page-not-found');
                }
                this.setState({ data: movie, editForm: true, genres });
            }
        } catch (exc) {
            toast.error(exc.response.data.message);
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

    doSubmit = async () => {
        try {
            const movie = { ...this.state.data };
            if (this.state.editForm) {
                await editMovie(movie);
                toast.success('Successfully Updated.');
            } else {
                await saveMovie(movie);
                toast.success('Successfully Created.');
            }
            this.props.history.replace('/movies');
        } catch (exc) {
            toast.error(exc.response.data.message);
        }
    }

    selectChangeHandler = async (value) => {
        const data = { ...this.state.data };
        const selectedGenre = this.state.genres.filter(genre => genre._id === value)[0];
        if (value) {
            data.genre = selectedGenre;
            return this.setState({ data, errors: {} });
        }
        data.genre = {};
        return this.setState({ data, errors: { message: 'Genre should be selected.' } });
    }

    render() {
        const { data, errors, genres } = this.state;
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect(genres, 'Genre', data.genre._id || '', this.selectChangeHandler, '_id', 'name', errors)}
                    {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}
                    {this.state.editForm ? this.renderButton('btn btn-primary', 'Edit') : this.renderButton('btn btn-primary', 'Create')}
                </form>
            </div>
        );
    }
}

export default MovieForm;