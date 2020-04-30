import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';

// local imports
import { AuthState, authReducer } from '../auth/reducers';

export type RootStateType = {
  router: RouterState;
  auth: AuthState;
};

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });
