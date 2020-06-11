import { UsersState } from './reducers';
import { User } from '../../api/clients/user';

export const setReadings = (state: UsersState, users: User[]): UsersState => {
  return {
    ...state,
    users: [...users],
  };
};

export const addReading = (state: UsersState, user: User): UsersState => {
  return {
    ...state,
    users: [user, ...state.users]
  }
}

export const removeReading = (state: UsersState, userId: number): UsersState => {
  const users = ([...state.users.filter(user => user.userId !== userId)])
  return {
    ...state,
    users,
  }
}