import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pizza } from './types';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {
      url,
      currentPage,
      categorySort,
      replaceSortType,
      replaceSortTypeFirstSymbol,
      searchParam,
    } = params;

    const { data } = await axios.get<Pizza[]>(
      `${url}?p=${currentPage}&l=4&${categorySort}&sortBy=${replaceSortType}&order=${replaceSortTypeFirstSymbol}&${searchParam}`,
    );

    return data;
  },
);
