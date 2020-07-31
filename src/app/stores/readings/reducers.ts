import { getType, createReducer } from 'typesafe-actions';

import * as Actions from './actions';
import * as ReducerHandlers from './reducer-handlers';
import { createReducerHandler } from '../createReducerHandler';
import { Reading } from '../../api/clients/readings';

export interface ReadingsState {
  readings: Reading[];
  currentPage: number;
}

const initialState: ReadingsState = {
  readings: [],
  currentPage: 0,
};

export const readingsReducer = createReducer(initialState, {
  [getType(Actions.setReadings)]: createReducerHandler(ReducerHandlers.setReadings),
  [getType(Actions.addReading)]: createReducerHandler(ReducerHandlers.addReading),
  [getType(Actions.removeReading)]: createReducerHandler(ReducerHandlers.removeReading),
  [getType(Actions.setCurrentPage)]: createReducerHandler(ReducerHandlers.setCurrentPage),
});
