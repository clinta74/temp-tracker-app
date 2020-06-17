import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { getIsAuthenticated, getDecoded } from '../stores/auth/selectors';

import { AuthRoleWrapper } from './auth-role-wrapper';

// Import components
import { ROLES } from '../constants';

export const Navbar = () => {

    const isAuthenticated = useSelector(getIsAuthenticated);
    const decoded = useSelector(getDecoded);

    return (
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
    );
}