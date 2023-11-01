export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  type: number[];
  count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface pizzaSliceState {
  items: Pizza[];
  status: Status;
}
