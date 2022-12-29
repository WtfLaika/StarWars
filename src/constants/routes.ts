import {Charachter} from './../redux/character.slice';

export enum ROUTES {
  CHARACTERS_LIST = 'CHARACTERS_LIST',
  CHARACTER_INFO = 'CHARACTER_INFO',
}

export type RootStackParamList = {
  CHARACTERS_LIST: undefined;
  CHARACTER_INFO: {character: Charachter};
};
