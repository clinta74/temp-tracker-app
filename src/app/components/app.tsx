import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import { Login } from '.';
import { useSelector } from 'react-redux';
import { getIsAuthenticated, getDecoded } from '../stores/auth/selectors';
import { AuthorizedRoute } from './authorized-route';
import { Dashboard } from './dashboard';
import { Logout } from './logout';
import { Profile } from './profile';

export const App = () => {

    const isAuthenticated = useSelector(getIsAuthenticated);
    const decoded = useSelector(getDecoded);

    return (
        <div className="vh-100">
            <header className="mb-4 bg-light">
                <div className="d-flex justify-content-between p-3 shadow-sm">
                    <div className="mx-4">Temp Tracker</div>
                    <div>
                        {
                            isAuthenticated &&
                            <div>
                                <Link to="/profile" className="text-capitalize">{decoded.sub}</Link>
                                <Link to="/logout" className="mx-4">Log Out</Link>
                            </div>
                        }
                    </div>
                </div>
            </header>        <div className="container">
                <Switch>
                    <AuthorizedRoute path="/dashboard" isAuthorized={isAuthenticated} to="/login" component={Dashboard} />
                    <AuthorizedRoute path="/profile" isAuthorized={isAuthenticated} to="/login" component={Profile} />
                    <AuthorizedRoute path="/logout" isAuthorized={isAuthenticated} to="/login" component={Logout} />
                    <Route path="/login" component={Login} />
                    <Redirect to="/dashboard" />
                </Switch>
            </div>
        </div>
    );
}