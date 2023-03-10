import {apiGetCharachters} from './../api/api';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';

export interface Charachter {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
  height: string;
}

interface –°haracterState {
  characters: Charachter[];
  favoriteCharacters: string[];
  currentPage: number;
  maleFansAmount: number;
  femaleFansAmount: number;
  otherFansAmount: number;
  hasNextPage?: boolean;
  likedCharacters?: string[];
}

export const initialState: –°haracterState = {
  characters: [],
  favoriteCharacters: [],
  currentPage: 1,
  maleFansAmount: 0,
  femaleFansAmount: 0,
  otherFansAmount: 0,
};

const character = createSlice({
  name: 'charachter',
  initialState,
  reducers: {
    setCharachters: (state, {payload}: PayloadAction<Charachter[]>) => {
      state.characters = payload;
    },
    setCurrentPage: (state, {payload}: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setHasNextPage: (state, {payload}: PayloadAction<boolean>) => {
      state.hasNextPage = payload;
    },
    updateCharachters: (state, {payload}: PayloadAction<Charachter[]>) => {
      state.characters = [...state.characters, ...payload];
    },
    addFavoriteCharacter: (state, {payload}: PayloadAction<string>) => {
      state.favoriteCharacters = [...state.favoriteCharacters, payload];
    },
    removeFavoriteCharacter: (state, {payload}: PayloadAction<string>) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        item => item !== payload,
      );
    },
    increaseFansAmount: (state, {payload}: PayloadAction<string>) => {
      if (payload === 'male') {
        state.maleFansAmount = state.maleFansAmount + 1;
      } else if (payload === 'female') {
        state.femaleFansAmount = state.femaleFansAmount + 1;
      } else {
        state.otherFansAmount = state.otherFansAmount + 1;
      }
    },
    decreaseFansAmount: (state, {payload}: PayloadAction<string>) => {
      if (payload === 'male' && state.maleFansAmount > 0) {
        state.maleFansAmount = state.maleFansAmount - 1;
      } else if (payload === 'female' && state.femaleFansAmount > 0) {
        state.femaleFansAmount = state.femaleFansAmount - 1;
      } else if (typeof payload === 'string' && state.otherFansAmount > 0) {
        state.otherFansAmount = state.otherFansAmount - 1;
      }
    },
    resetFans: state => {
      state.femaleFansAmount = 0;
      state.maleFansAmount = 0;
      state.otherFansAmount = 0;
      state.favoriteCharacters = [];
    },
  },
});

export const {
  setCharachters,
  setCurrentPage,
  setHasNextPage,
  updateCharachters,
  addFavoriteCharacter,
  removeFavoriteCharacter,
  increaseFansAmount,
  decreaseFansAmount,
  resetFans,
} = character.actions;

export default character.reducer;

export const getCharachters =
  (isRefresh?: boolean, cb?: () => void): AppThunk =>
  async (dispatch, getState) => {
    try {
      const currentPage = getState().character.currentPage;
      const res = await apiGetCharachters(isRefresh ? 1 : currentPage + 1);
      dispatch(setCurrentPage(isRefresh ? 1 : currentPage + 1));
      if (res.results) {
        if (isRefresh) {
          dispatch(setCharachters(res.results));
        } else {
          dispatch(updateCharachters(res.results));
        }
        dispatch(setHasNextPage(!!res.next));
      }
    } catch (error) {
      console.log('update Characters Error', error);
    } finally {
      if (cb) {
        setTimeout(() => cb(), 1000);
      }
    }
  };

export const handleFavoriteCharacters =
  (charachter: Charachter): AppThunk =>
  async (dispatch, getState) => {
    try {
      const {favoriteCharacters} = getState().character;
      if (!favoriteCharacters.includes(charachter.name)) {
        dispatch(addFavoriteCharacter(charachter.name));
        return dispatch(increaseFansAmount(charachter.gender));
      }
      dispatch(removeFavoriteCharacter(charachter.name));

      dispatch(decreaseFansAmount(charachter.gender));
    } catch (error) {
      console.log('handle Favorite Characters Error', error);
    }
  };
