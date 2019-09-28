import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';
import Form from './shared/form';
import loginService from '../services/loginService';
import { toast } from 'react-toastify';
import MySpinner from './shared/spinner';

class LoginForm extends Form {

    // username = React.createRef();
    state = {
        data: { email: '', password: '' },
        loading: false,
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(5).label('Password')
    }

    doSubmit = async () => {
        try {
            this.setState({ loading: true });
            await loginService.login(this.state.data);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        } catch (exc) {
            this.setState({ loading: false });
            if (exc.response && (exc.response.status === 404 || exc.response.status === 400)) {
                toast.error(exc.response.data.message);
            }
        }
    }

    render() {
        if (loginService.getCurrentUser()) return <Redirect to="/" />
        const mainWrapper = {
            width: '550px',
            boxShadow: '1px 1px 7px #ccc',
            padding: '30px',
            borderRadius: '6px',
            backgroundColor: 'white'
        }
        return (
            <React.Fragment>
                <div className="form mt-5" style={mainWrapper}>
                    <h2 className='text-center mb-4 text-primary'>Login</h2>
                    <div className="alert alert-info">
                        <div>To see admin functionality please login with below credentials:</div>
                        <div>Email: admin@admin.com </div>
                        <div>Password: admin1</div>
                    </div>
                    {this.state.loading ? <MySpinner /> : <form onSubmit={this.handleSubmit}>
                        {this.renderInput('email', 'Email', 'email', true, 'envelope')}
                        {this.renderInput('password', 'Password', 'password', true, 'key')}
                        {this.renderButton('btn btn-primary', 'Submit')}
                    </form >}

                </div >
            </React.Fragment>

        );
    }
}

export default LoginForm;