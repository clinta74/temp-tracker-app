import { UsersState } from './reducers';
import { User } from '../../api/clients/user';
import { Role } from '../../api/clients/roles';

export const setUsers = (state: UsersState, users: User[]): UsersState => {
  return {
    ...state,
    users: [...users],
  };
};

export const addUser = (state: UsersState, user: User): UsersState => {
  return {
    ...state,
    users: [user, ...state.users]
  }
}

export const removeUser = (state: UsersState, userId: number): UsersState => {
  const users = ([...state.users.filter(user => user.userId !== userId)])
  return {
    ...state,
    users,
  }
}

export const setRoles = (state: UsersState, roles: Role[]): UsersState => {
  return {
    ...state,
    roles: [...roles],
  };
};