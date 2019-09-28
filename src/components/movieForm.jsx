import React from 'react';
import Form from './shared/form';
import { getMovie, saveMovie, editMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
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
            imageUrl: '',
            numberInStock: 0,
            dailyRentalRate: 0
        },
        genres: [],
        editForm: false,
        errors: {}
    }

    async populateGenres() {
        try {
            const { data: genres } = await getGenres();
            this.setState({ genres });
        } catch (exc) { }
    }

    async populateMovie() {
        try {
            const id = this.props.match.params.id;
            if (id === 'new') return;
            const { data: movie } = await getMovie(id);
            this.setState({ data: movie, editForm: true });
        } catch (exc) {
            if (exc.response && exc.response.status === 404) {
                toast.error(exc.response.data.message);
                this.props.history.replace('/page-not-found');
            }
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
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
        imageUrl: Joi.string().required().uri().trim().max(128).label('Image URL'),
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
                const resp = await saveMovie(movie);
                if (!resp.error) {
                    toast.success('Successfully Created.');
                }
            }
            this.props.history.replace('/movies');
        } catch (exc) {
            if (exc.response && exc.response.data) {
                toast.error(exc.response.data.message);
            }
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
                    {this.renderInput('imageUrl', 'Image URL')}
                    {this.state.editForm ? this.renderButton('btn btn-primary', 'Edit') : this.renderButton('btn btn-primary', 'Create')}
                </form>
            </div>
        );
    }
}

export default MovieForm;