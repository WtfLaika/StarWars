import {GET_ENDPOINTS} from './../constants/endpoints';
import axios from 'axios';
import {baseUrl} from '../constants/endpoints';

export const apiGetCharachters = async (page: number = 1) => {
  try {
    const res = await axios.get(
      baseUrl + GET_ENDPOINTS.people + GET_ENDPOINTS.pageNumber + page,
    );
    return res?.data;
  } catch (e) {
    console.log('getCharachters error ', e);
  }
};

export const apiSearchCharachters = async (searchValue: string) => {
  try {
    const res = await axios.get(
      baseUrl + GET_ENDPOINTS.people + GET_ENDPOINTS.search + searchValue,
    );
    return res?.data.results;
  } catch (e) {
    console.log('searchCharachters error ', e);
  }
};

export const apiGetInfoFromUrl = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res?.data;
  } catch (e) {
    console.log('searchCharachters error ', e);
  }
};
