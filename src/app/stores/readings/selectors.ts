import { createSelector } from 'reselect';
import { RootStateType } from '../root/reducer';

const getStoreState = (state: RootStateType) => {
    return state.readings
}

export const getReadings = createSelector(
    getStoreState,
    ({ readings }) => readings
);
