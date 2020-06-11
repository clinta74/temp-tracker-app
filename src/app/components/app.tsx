import React from 'react';
import { Route, Redirect, Switch, Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { getIsAuthenticated, getDecoded } from '../stores/auth/selectors';

import { AuthorizedRoute } from './authorized-route';
import { AuthRoleWrapper } from './auth-role-wrapper';

// Import components
import { Dashboard } from './dashboard';
import { Readings } from './readings';
import { Login, Logout } from './login';
import { Users, Profile, AddUser, EditUser } from './user';
import { ROLES } from '../constants';

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
                        <>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav mr-auto">
                                    <NavLink to="/dashboad" className="nav-item nav-link">Dashboard</NavLink>
                                    <NavLink to="/readings" className="nav-item nav-link">Readings</NavLink>
                                    <AuthRoleWrapper roles={[ROLES.ADMIN]}>
                                        <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
                                    </AuthRoleWrapper>
                                    <NavLink to="/profile" className="nav-item nav-link">My Profile</NavLink>
                                    <NavLink to="/logout" className="nav-item nav-link">Log Out</NavLink>
                                </div>
                                <span className="text-capitalize">{decoded.sub}</span>
                            </div>
                        </>
                    }
                </nav>
            </header>
            <div className="container">
                <Switch>
                    <AuthorizedRoute path="/dashboard" isAuthorized={isAuthenticated} to="/login" component={Dashboard} />
                    <AuthorizedRoute path="/readings" isAuthorized={isAuthenticated} to="/dashboard" component={Readings} />
                    <AuthorizedRoute path="/users" exact isAuthorized={isAuthenticated} to="/dashboard" roles={[ROLES.ADMIN]} component={Users} />
                    <AuthorizedRoute path="/users/add" isAuthorized={isAuthenticated} to="/dashboard" roles={[ROLES.ADMIN]} component={AddUser} />
                    <AuthorizedRoute path="/users/:userid" isAuthorized={isAuthenticated} to="/dashboard" roles={[ROLES.ADMIN]} component={EditUser} />
                    <AuthorizedRoute path="/profile" isAuthorized={isAuthenticated} to="/dashboard" component={Profile} />
                    <AuthorizedRoute path="/logout" isAuthorized={isAuthenticated} to="/login" component={Logout} />
                    <Route path="/login" component={Login} />
                    <Redirect to="/dashboard" />
                </Switch>
            </div>
        </div>
    );
}