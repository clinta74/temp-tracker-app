import { createAction } from 'typesafe-actions';
import { Reading } from '../../api/clients/readings';

export const setReadings = createAction('readings/SET_READINGS', (readings: Reading[]) => readings)();
export const addReading = createAction('readings/ADD_READING', (reading: Reading) => reading)();
export const removeReading = createAction('readings/REMOVE_READING', (readingId: string) => readingId)();