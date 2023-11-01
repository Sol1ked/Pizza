import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, SortFilter, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: '1',
  searchValue: '',
  sort: {
    title: 'популярности (высокая оценка)',
    type: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortFilter>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload.toString();
    },
    setFiltersParams(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = action.payload.currentPage.toString();
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFiltersParams, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
