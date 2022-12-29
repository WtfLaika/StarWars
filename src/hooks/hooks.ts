import { Dispatcher, RootState } from './../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => Dispatcher = useDispatch as any;
