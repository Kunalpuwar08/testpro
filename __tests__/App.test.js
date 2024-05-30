import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('App component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(<App />);

    expect(getByTestId('app-navigation')).toBeTruthy();
  });
});
