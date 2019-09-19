import React, { Component } from 'react';

class MovieForm extends Component {

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