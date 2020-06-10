import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { getRoles } from '../stores/auth/selectors';

type AuthorizedRouteProps = {
    isAuthorized: boolean;
    to: string;
    roles?: string[];
} & RouteProps;

export const AuthorizedRoute: React.FunctionComponent<AuthorizedRouteProps> = ({ isAuthorized, to, roles, ...props }) => {
    const redirect = useLocation().pathname;
    const url = `${to}?redirect=${redirect}`;
    const userRoles = useSelector(getRoles);
    const hasRole = (roles === undefined) || (userRoles && userRoles.some(role => roles.includes(role)));

    return (isAuthorized && hasRole) ? <Route {...props} /> : <Redirect to={url} />;
};
