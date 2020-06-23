import { createAction } from 'typesafe-actions';
import { LoginResponse } from '../../api/clients/auth';

export const logout = createAction('auth/LOGOUT')();
export const setToken = createAction('auth/SET_TOKEN', ({ token }): LoginResponse => ({ token }))();
