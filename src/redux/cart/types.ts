export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

export type RemoveProduct = {
  id: string;
  price: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
