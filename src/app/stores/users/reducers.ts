import { getType, createReducer } from 'typesafe-actions';

import * as Actions from './actions';
import * as ReducerHandlers from './reducer-handlers';
import { createReducerHandler } from '../createReducerHandler';
import { User } from '../../api/clients/user';
import { Role } from '../../api/clients/roles';

export interface UsersState {
  users: User[],
  roles: Role[],
}

const initialState: UsersState = {
  users: [],
  roles: [],
};

export const usersReducer = createReducer(initialState, {
  [getType(Actions.setUsers)]: createReducerHandler(ReducerHandlers.setUsers),
  [getType(Actions.addUser)]: createReducerHandler(ReducerHandlers.addUser),
  [getType(Actions.removeUser)]: createReducerHandler(ReducerHandlers.removeUser),
  [getType(Actions.setRoles)]: createReducerHandler(ReducerHandlers.setRoles),
});
