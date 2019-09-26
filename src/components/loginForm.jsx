import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from './shared/form';
import loginService from '../services/loginService';
import { toast } from 'react-toastify';

class LoginForm extends Form {

    // username = React.createRef();
    state = {
        data: { email: '', password: '' },
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(5).label('Password')
    }

    doSubmit = async () => {
        try {
            await loginService.login(this.state.data);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        } catch (exc) {
            if (exc.response && (exc.response.status === 404 || exc.response.status === 400)) {
                toast.error(exc.response.data.message);
            }
        }
    }

    render() {
        if (loginService.getCurrentUser()) return <Redirect to="/" />
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'Email', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('btn btn-primary', 'Submit')}
                </form>
            </div>
        );
    }
}

export default LoginForm;