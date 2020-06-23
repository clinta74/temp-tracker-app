import Cookie from 'js-cookie';

import { AuthState } from './reducers';
import { config } from '../../../config';

export const setToken = (state: AuthState, payload: { token: string }): AuthState => {
  const { token } = payload;
  Cookie.set(config.TOKEN_COOKIE, token);

  return {
    ...state,
    token,
  };
};

export const logout = (state: AuthState): AuthState => {
  Cookie.remove(config.TOKEN_COOKIE);
  return {
    ...state,
    token: false,
  };
};