import React from 'react';
import Joi from 'joi-browser';
import Form from './shared/form';
import { register } from '../services/userService';
import loginService from '../services/loginService';

class RegisterForm extends Form {
    state = {
        data: { email: '', password: '', name: '' },
        errors: {}
    }

    schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().min(3).label('Name')
    }

    doSubmit = async () => {
        try {
            const resp = await register(this.state.data);
            loginService.loginWithJwt(resp.headers['x-auth-token']);
            window.location = '/';
        } catch (exc) {
            if (exc.response && (exc.response.status === 400 || exc.response.status === 404)) {
                const errors = { ...this.state.errors };
                errors.email = exc.response.data.message;
                this.setState({ errors });
            }
        }
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('btn btn-primary', 'Submit')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;