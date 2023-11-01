import { getTotalSumCart } from './getTotalSumCart';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = getTotalSumCart(items);

  return {
    items,
    totalPrice,
  };
};
