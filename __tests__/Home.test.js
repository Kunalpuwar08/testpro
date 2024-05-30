import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react-native';
import axios from 'axios';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../src/screens/Home/Home';

jest.mock('axios');

describe('Home component', () => {
  const mockStore = configureStore([]);

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    const mockedData = [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ];

    axios.get.mockResolvedValueOnce({data: mockedData});

    const store = mockStore({});

    const {getByText} = render(
      <Provider store={store}>
        <Home />
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

    const store = mockStore({});

    const {getByTestId} = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    await waitFor(() => {
      fireEvent.press(getByTestId('add-to-cart-button'));
    });

    const actions = store.getActions();
    expect(actions).toEqual([{type: 'user/addCart', payload: mockedData[0]}]);
  });
});
