import React from 'react';
import { useSelector } from 'react-redux';
import { getRoles } from '../stores/auth/selectors';

type AuthRoleWrapperProps = {
    roles: string[],
    invert?: boolean,
}

export const AuthRoleWrapper: React.FunctionComponent<AuthRoleWrapperProps> = ({ roles, invert = false, children }) => {
    const userRoles = useSelector(getRoles);
    const hasRole = userRoles && userRoles.some(role => roles.includes(role));

    return (hasRole && !invert) ? children as JSX.Element : null;
};