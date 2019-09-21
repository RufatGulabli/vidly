import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './shared/form';

class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().min(3).label('Name')
    }

    doSubmit = () => {
        console.log('Register Form Submitted');
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('btn btn-primary', 'Sumbit')}
                </form>
            </div>
        );
    }
}

export default RegisterForm;