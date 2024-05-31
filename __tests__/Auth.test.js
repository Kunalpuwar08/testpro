import {signInWithEmailAndPassword} from '@react-native-firebase/auth';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import Auth from '../src/screens/Auth/Auth';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({navigate: jest.fn()})),
}));

// Mocking the createUserWithEmailAndPassword function
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  signInWithEmailAndPassword: jest.fn(),
}));

const auth = require('@react-native-firebase/auth');

describe('Auth component', () => {
  const email = 'test@example.com';
  const password = 'password123';

  it('should render correctly', () => {
    const {getByText, getByPlaceholderText} = render(<Auth />);

    expect(getByText('My APP')).toBeTruthy();
    expect(getByPlaceholderText('Enter Your Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Your Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText("Don't have an account? click here")).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword when login button is pressed', async () => {
    auth.signInWithEmailAndPassword.mockResolvedValueOnce({
      user: {uid: '123', email},
    });

    const {getByText, getByPlaceholderText} = render(<Auth />);
    const emailInput = getByPlaceholderText('Enter Your Email');
    const passwordInput = getByPlaceholderText('Enter Your Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);

    fireEvent.press(loginButton);

    const userCredential = await signInWithEmailAndPassword(
      emailInput.props.value,
      passwordInput.props.value,
    );

    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password,
    );
    expect(userCredential.user.uid).toEqual('123');
    expect(userCredential.user.email).toEqual(email);
  });
});
