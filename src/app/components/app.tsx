import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import { Login } from '.';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../stores/auth/selectors';
import { AuthorizedRoute } from './authorized-route';
import { Dashboard } from './dashboard';
import { Logout } from './logout';

export const App = () => {

    const isAuthenticated = useSelector(getIsAuthenticated);

    return (
        <div className="vh-100">
            <header className="mb-4 bg-light">
                <div className="d-flex justify-content-between p-3 shadow-sm">
                    <div className="mx-4">Temp Tracker</div>
                    {isAuthenticated && <Link to="/logout" className="mx-4">Log Out</Link>}
                </div>
            </header>        <div className="container">
                <Switch>
                    <AuthorizedRoute path="/dashboard" isAuthorized={isAuthenticated} to="/login" component={Dashboard} />
                    <AuthorizedRoute path="/logout" isAuthorized={isAuthenticated} to="/login" component={Logout} />
                    <Route path="/login" component={Login} />
                    <Redirect to="/dashboard" />
                </Switch>
            </div>
        </div>
    );
}