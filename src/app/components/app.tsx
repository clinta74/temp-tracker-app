import React from 'react';
import { Route, Redirect, Switch, Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getIsAuthenticated, getDecoded } from '../stores/auth/selectors';
import { AuthorizedRoute } from './authorized-route';
import { Readings } from './readings/readings';
import { Login, Logout } from './login';
import { Profile } from './user/profile';
import { Dashboard } from './dashboard';

export const App = () => {

    const isAuthenticated = useSelector(getIsAuthenticated);
    const decoded = useSelector(getDecoded);

    return (
        <div className="vh-100">
            <header className="mb-4 bg-light">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/dashboard" className="navbar-brand">Temp Tracker</Link>
                    {
                        isAuthenticated &&
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav mr-auto">
                                <NavLink to="/dashboad" className="nav-item nav-link">Dashboard</NavLink>
                                <NavLink to="/readings" className="nav-item nav-link">Readings</NavLink>
                                <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                                <NavLink to="/logout" className="nav-item nav-link">Log Out</NavLink>
                            </div>
                            <span className="text-capitalize">{decoded.sub}</span>
                        </div>
                    }
                </nav>
            </header>
            <div className="container">
                <Switch>
                    <AuthorizedRoute path="/dashboard" isAuthorized={isAuthenticated} to="/login" component={Dashboard} />
                    <AuthorizedRoute path="/readings" isAuthorized={isAuthenticated} to="/login" component={Readings} />
                    <AuthorizedRoute path="/profile" isAuthorized={isAuthenticated} to="/login" component={Profile} />
                    <AuthorizedRoute path="/logout" isAuthorized={isAuthenticated} to="/login" component={Logout} />
                    <Route path="/login" component={Login} />
                    <Redirect to="/dashboard" />
                </Switch>
            </div>
        </div>
    );
}