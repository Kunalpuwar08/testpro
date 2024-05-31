import {configureStore} from '@reduxjs/toolkit';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import axios from 'axios';
import React from 'react';
import {Provider} from 'react-redux';
import userSlice from '../src/redux/slices/userSlice';
import Home from '../src/screens/Home/Home';

jest.mock('axios');

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({navigate: jest.fn()})),
}));

describe('Home component', () => {
  const store = configureStore({
    reducer: {
      cart: userSlice,
    },
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const mockedData = [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ];

    axios.get.mockResolvedValueOnce({data: mockedData});

    const {getByText} = render(
      <Provider store={store}>
        <Home />,
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('List Of Data')).toBeTruthy();
    });
  });

  it('should dispatch addCart action when Add to cart button is pressed', async () => {
    const mockedData = [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ];

    axios.get.mockResolvedValueOnce({data: mockedData});

    const {getByTestId} = render(
      <Provider store={store}>
        <Home />,
      </Provider>,
    );

    await waitFor(() => {
      fireEvent.press(getByTestId('add-to-cart-button-0'));
    });

    const state = store.getState();
    expect(state).toEqual({cart: {cartData: [mockedData[0]]}});
  });
});
