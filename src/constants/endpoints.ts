import Config from 'react-native-config';

export const baseUrl = Config.BASE_URL;

export const GET_ENDPOINTS = {
  people: '/people',
  pageNumber: '/?page=',
  search: '/?search=',
};
