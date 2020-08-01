import { ReadingsState } from './reducers';
import { Reading } from '../../api/clients/readings';

export const setReadings = (state: ReadingsState, readings: Reading[]): ReadingsState => {
    return {
        ...state,
        readings: [...readings],
    };
};

export const addReading = (state: ReadingsState, reading: Reading): ReadingsState => {
    return {
        ...state,
        readings: [reading, ...state.readings]
    }
}

export const removeReading = (state: ReadingsState, readingId: string): ReadingsState => {
    const readings = ([...state.readings.filter(reading => reading.readingId !== readingId)])
    return {
        ...state,
        readings,
    }
}

export const setCurrentPage = (state: ReadingsState, currentPage: number): ReadingsState => {
    return {
        ...state,
        currentPage,
    };
};

export const setTotalReadings = (state: ReadingsState, totalReadings: number): ReadingsState => {
    return {
        ...state,
        totalReadings,
    };
};