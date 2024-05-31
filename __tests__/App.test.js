import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('App component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);

    expect(getByText('List Of Data')).toBeTruthy();
  });
});
