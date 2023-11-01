import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { getTotalSumCart } from '../../utils/getTotalSumCart';
import { CartItem, CartSliceState, RemoveProduct } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductInCart(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = getTotalSumCart(state.items);
    },

    minusProduct(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },

    removeProductFromCart(state, action: PayloadAction<RemoveProduct>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice -= action.payload.price;
    },

    clearAllProducts(state) {
      state.items.length = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addProductInCart, removeProductFromCart, clearAllProducts, minusProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
