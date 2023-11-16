
import { render, screen } from '@testing-library/react';
import Checkout from '../src/components/Checkout';
import { useBasket } from "../src/providers/BasketProvider";
const { totalItems, totalPrice, totalVat } = useBasket();
test('Checkout total price calc', () => {
  render(<Checkout />);
  
  expect(screen.getByText('Merhaba')).toBeInTheDocument(); 
});