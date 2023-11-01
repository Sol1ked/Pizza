export enum SortPropertyEnum {
  RATING_ASC = 'rating',
  RATING_DESC = '+rating',
  PRICE_ASC = 'price',
  PRICE_DESC = '+price',
  TITLE_ASC = 'title',
  TITLE_DESC = '+title',
}

export type SortFilter = {
  title: string;
  type: SortPropertyEnum;
};

export interface FilterSliceState {
  categoryId: number;
  currentPage: string;
  searchValue: string;
  sort: SortFilter;
}
