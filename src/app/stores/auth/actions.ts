import { createAction } from 'typesafe-actions';

export const logout = createAction('auth/LOGOUT')();
export const setToken = createAction('auth/SET_TOKEN', (token: string) => token)();
