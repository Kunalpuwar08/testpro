import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../src/redux/slices/userSlice';
import Cart from '../src/screens/Cart/Cart';

describe('Cart component', () => {
  it('should render correctly', () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    expect(getByText('Cart List')).toBeTruthy();
  });

  it('should clear the cart when the clear button is pressed', () => {
    const store = configureStore({
      reducer: {
        cart: userSlice,
      },
    });

    store.dispatch({
      type: 'cart/addToCart',
      payload: {id: 1, name: 'Test Item'},
    });

    const {getByText} = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    fireEvent.press(getByText('clear'));

    const state = store.getState();
    expect(state.cart.cartData.length).toBe(0);
  });
});
