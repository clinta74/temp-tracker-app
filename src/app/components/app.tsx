import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { getIsAuthenticated, getDecoded } from '../stores/auth/selectors';

import { AuthorizedRoute } from './authorized-route';

// Import components
import { Dashboard } from './dashboard';
import { Readings } from './readings';
import { Login, Logout } from './login';
import { Users, Profile, AddUser, EditUser } from './user';
import { ROLES } from '../constants';
import { Navbar } from './navbar';

export const App = () => {

    const isAuthenticated = useSelector(getIsAuthenticated);

    return (
        <div className="vh-100">
            <Navbar />
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