import {configureStore} from '@reduxjs/toolkit';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import userSlice from '../src/redux/slices/userSlice';
import Cart from '../src/screens/Cart/Cart';

describe('Cart component', () => {
  const store = configureStore({
    reducer: {
      cart: userSlice,
    },
  });

  it('should render correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <Cart />,
      </Provider>,
    );
    expect(getByText('Cart List')).toBeTruthy();
  });

  it('should clear the cart when the clear button is pressed', () => {
    store.dispatch({
      type: 'cart/addToCart',
      payload: {id: 1, name: 'Test Item'},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Cart />,
      </Provider>,
    );

    fireEvent.press(getByText('clear'));

    const state = store.getState();
    expect(state.cart.cartData.length).toBe(0);
  });
});
