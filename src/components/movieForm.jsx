import React from 'react';
import Form from './shared/form';

class MovieForm extends Form {

    onSubmit = () => {
        this.props.history.replace('/movies');
    }

    render() {
        return (
            <div>
                <h1>Movie Form - {this.props.match.params.id}</h1>
                <button className="btn btn-success btn-lg" onClick={this.onSubmit}>Save</button>
            </div>
        );
    }
}

export default MovieForm;