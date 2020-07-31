import { createSelector } from 'reselect';
import { RootStateType } from '../root/reducer';

const getStoreState = (state: RootStateType) => {
    return state.readings
}

export const getReadings = createSelector(
    getStoreState,
    ({ readings }) => readings
);

export const getCurrentPage = createSelector(
    getStoreState,
    ({ currentPage }) => currentPage

)

export const getTotalReadings = createSelector(
    getStoreState,
    ({ readings }) => readings.length
);