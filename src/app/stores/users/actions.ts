import { createAction } from 'typesafe-actions';
import { User } from '../../api/clients/user';
import { Role } from '../../api/clients/roles';

export const setUsers = createAction('readings/SET_USERS', (users: User[]) => users)();
export const addUser = createAction('readings/ADD_USER', (user: User) => user)();
export const removeUser = createAction('readings/REMOVE_USER', (userId: number) => userId)();
export const setRoles = createAction('readings/SET_ROLES', (roles: Role[]) => roles)();