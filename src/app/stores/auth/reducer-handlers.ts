import Cookie from 'js-cookie';

import { AuthState } from './reducers';
import { config } from '../../../config';

export const setToken = (state: AuthState, payload: { token: string, userId: number }): AuthState => {
  const { token, userId } = payload;
  Cookie.set(config.TOKEN_COOKIE, token);

  return {
    ...state,
    token,
    userId,
  };
};

export const logout = (state: AuthState): AuthState => {
  Cookie.remove(config.TOKEN_COOKIE);
  return {
    ...state,
    token: false,
    userId: undefined,
  };
};