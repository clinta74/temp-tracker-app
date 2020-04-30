import { getType, createReducer } from 'typesafe-actions';
import Cookie from 'js-cookie';

import * as Actions from './actions';
import * as ReducerHandlers from './reducer-handlers';
import { config } from '../../../config';
import { createReducerHandler } from '../createReducerHandler';

export interface AuthState {
  token: string | false;
}

const token = Cookie.get(config.TOKEN_COOKIE) || false;
console.log('Token', token);

const initialState: AuthState = {
  token,
};

export const authReducer = createReducer(initialState, {
  [getType(Actions.setToken)]: createReducerHandler(ReducerHandlers.setToken),
  [getType(Actions.logout)]: createReducerHandler(ReducerHandlers.logout),
});
