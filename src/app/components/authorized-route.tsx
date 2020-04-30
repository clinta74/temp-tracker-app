import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';

type AuthorizedRouteProps = {
    isAuthorized: boolean;
    to: string;
} & RouteProps;

export const AuthorizedRoute: React.FunctionComponent<AuthorizedRouteProps> = ({ isAuthorized, to, ...props }) => {
    const redirect = useLocation().pathname;
    const url = `${to}?redirect=${redirect}`;
    return isAuthorized ? <Route {...props} /> : <Redirect to={url} />;
};
