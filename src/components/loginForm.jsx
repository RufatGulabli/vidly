import React from 'react';
import Joi from 'joi-browser';
import Form from './shared/form';

class LoginForm extends Form {

    // username = React.createRef();
    state = {
        data: { username: '', password: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().min(3).label('Username'),
        password: Joi.string().required().min(5).label('Password')
    }

    doSubmit = () => {
        console.log('LoginForm Submitted');
    }

    render() {

        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('btn btn-primary', 'Sumbit')}
                </form>
            </div>
        );
    }
}

export default LoginForm;