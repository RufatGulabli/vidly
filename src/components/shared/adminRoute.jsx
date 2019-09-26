import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loginService from '../../services/loginService';

const AdminRoute = ({ path, component: Component, render, ...rest }) => {

    const isAdmin = loginService.getCurrentUser() && loginService.getCurrentUser().isAdmin;
    return (
        <Route
            path={path}
            {...rest}
            render={
                props => {
                    if (!isAdmin) return <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                    return Component ? <Component {...props} /> : render(props);
                }
            }
        />
    );
}

export default AdminRoute;