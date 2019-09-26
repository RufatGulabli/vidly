import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loginService from '../../services/loginService';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={
                props => {
                    if (!loginService.getCurrentUser()) return <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                    return Component ? <Component {...props} /> : render(props);
                }
            }
        />
    );
}

export default ProtectedRoute;