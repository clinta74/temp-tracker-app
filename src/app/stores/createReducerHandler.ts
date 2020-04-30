import { PayloadAction } from 'typesafe-actions';

export const createReducerHandler = <StateT, PayloadT>(handler: (state: StateT, payload: PayloadT) => StateT) => 
    (state: StateT, action: PayloadAction<string, PayloadT>) => handler(state, action.payload) as StateT;