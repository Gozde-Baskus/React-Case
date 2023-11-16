import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkout from '../src/components/Checkout';
import { BasketProvider } from '../src/providers/BasketProvider';

// Mock BasketProvider
jest.mock('../src/providers/BasketProvider', () => ({
  useBasket: jest.fn(() => ({
    totalItems: 2, 
    totalPrice: 50,
    totalVat: 5,
  })),
}));

test('renders Checkout component', () => {
  render(
    <BasketProvider>
      <Checkout />
    </BasketProvider>
  );


  expect(screen.getByText('Total Price:')).toHaveTextContent('50'); // Gerçek değere göre güncellenmeli
  expect(screen.getByText('Total VAT:')).toHaveTextContent('5'); // Gerçek değere göre güncellenmeli


});


