import {Action, configureStore} from '@reduxjs/toolkit';
import characterReducer from './character.slice';
import {ThunkAction} from 'redux-thunk';

export const store = configureStore({
  reducer: {
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type Dispatcher = (action: AppThunk | Action) => void;
