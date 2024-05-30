import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Auth from '../src/screens/Auth/Auth';

jest.mock('@react-navigation/native', () => ({
  __esModule: true,
  default: {
    useNavigation: jest.fn(() => ({navigate: jest.fn()})),
  },
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: {
    signInWithEmailAndPassword: jest.fn().mockResolvedValueOnce({}),
  },
}));

describe('Auth component', () => {
  it('should render correctly', () => {
    const {getByText, getByPlaceholderText} = render(<Auth />);

    expect(getByText('My APP')).toBeTruthy();
    expect(getByPlaceholderText('Enter Your Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Your Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText("Don't have an account? click here")).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword when login button is pressed', async () => {
    const {getByText, getByPlaceholderText} = render(<Auth />);
    const emailInput = getByPlaceholderText('Enter Your Email');
    const passwordInput = getByPlaceholderText('Enter Your Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(
        require('@react-native-firebase/auth').signInWithEmailAndPassword,
      ).toHaveBeenCalledWith('test@example.com', 'password');
    });
  });
});
