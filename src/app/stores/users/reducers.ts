import { getType, createReducer } from 'typesafe-actions';

import * as Actions from './actions';
import * as ReducerHandlers from './reducer-handlers';
import { createReducerHandler } from '../createReducerHandler';
import { User } from '../../api/clients/user';

export interface UsersState {
  users: User[]
}

const initialState: UsersState = {
  users: [],
};

export const usersReducer = createReducer(initialState, {
  [getType(Actions.setUsers)]: createReducerHandler(ReducerHandlers.setReadings),
  [getType(Actions.addUser)]: createReducerHandler(ReducerHandlers.addReading),
  [getType(Actions.removeUser)]: createReducerHandler(ReducerHandlers.removeReading),
});
