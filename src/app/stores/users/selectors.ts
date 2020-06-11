import { createSelector } from 'reselect';
import { RootStateType } from '../root/reducer';

const getStoreState = (state: RootStateType) => {
    return state.user
}

export const getUsers = createSelector(
    getStoreState,
    ({ users }) => users
);
