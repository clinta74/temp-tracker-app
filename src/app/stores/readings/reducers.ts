import { getType, createReducer } from 'typesafe-actions';

import * as Actions from './actions';
import * as ReducerHandlers from './reducer-handlers';
import { createReducerHandler } from '../createReducerHandler';
import { Reading } from '../../api/clients/readings';

export interface ReadingsState {
  readings: Reading[]
}

const initialState: ReadingsState = {
  readings: [],
};

export const readingsReducer = createReducer(initialState, {
  [getType(Actions.setReadings)]: createReducerHandler(ReducerHandlers.setReadings),
  [getType(Actions.addReading)]: createReducerHandler(ReducerHandlers.addReading),
  [getType(Actions.removeReading)]: createReducerHandler(ReducerHandlers.removeReading),
});
