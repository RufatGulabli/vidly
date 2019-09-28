import React from 'react';
import Joi from 'joi-browser';
import Form from './shared/form';
import { register } from '../services/userService';
import loginService from '../services/loginService';

class RegisterForm extends Form {
    state = {
        data: { email: '', password: '', name: '', phone: '' },
        errors: {}
    }

    schema = {
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().min(3).trim().label('Name'),
        phone: Joi.string().required().trim().min(4).max(16).label('Phone')
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
        const mainWrapper = {
            width: '550px',
            boxShadow: '1px 1px 7px #ccc',
            padding: '30px',
            borderRadius: '6px',
            backgroundColor: 'white'
        }

        return (
            <div className="form mt-3" style={mainWrapper}>
                <h2 className='text-center mb-4 text-primary'>Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('email', 'Email', 'email', true, 'envelope')}
                    {this.renderInput('password', 'Password', 'password', true, 'key')}
                    {this.renderInput('name', 'Name', '', true, 'user-circle')}
                    {this.renderInput('phone', 'Phone', '', true, 'phone-square')}
                    {this.renderButton('btn btn-primary', 'Submit')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;