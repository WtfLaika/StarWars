import {Action, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import characterReducer from './character.slice';
import {ThunkAction} from 'redux-thunk';

export const store = configureStore({
  reducer: {
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type Dispatcher = (action: AppThunk | Action) => void

export const useAppDispatch: () => Dispatcher = useDispatch as any;
