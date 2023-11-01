import { CartItem } from '../redux/cart/types';

export const getTotalSumCart = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
