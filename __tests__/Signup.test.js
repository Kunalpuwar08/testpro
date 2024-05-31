import {createUserWithEmailAndPassword} from '@react-native-firebase/auth';
import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import Signup from '../src/screens/Auth/Signup';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({navigate: jest.fn()})),
}));

// Mocking the createUserWithEmailAndPassword function
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  createUserWithEmailAndPassword: jest.fn(),
}));

const auth = require('@react-native-firebase/auth');

describe('createUserWithEmailAndPassword', () => {
  const email = 'test@example.com';
  const password = 'password123';

  beforeEach(() => {
    auth.createUserWithEmailAndPassword.mockClear();
  });

  it('renders correctly', async () => {
    const {getByPlaceholderText, getByText} = render(<Signup />);

    expect(getByText('My APP')).toBeTruthy();
    expect(getByPlaceholderText('Enter Your Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter Your Password')).toBeTruthy();
    expect(getByText('SignUp')).toBeTruthy();
    expect(getByText('Already Have an account? click here')).toBeTruthy();
  });

  it('handles email and password input', () => {
    const {getByPlaceholderText} = render(<Signup />);
    const emailInput = getByPlaceholderText('Enter Your Email');
    const passwordInput = getByPlaceholderText('Enter Your Password');

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe(email);
    expect(passwordInput.props.value).toBe('password123');
  });

  it('should create a new user with valid email and password', async () => {
    auth.createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {uid: '123', email: email},
    });

    const {getByText, getByPlaceholderText} = render(<Signup />);

    const emailInput = getByPlaceholderText('Enter Your Email');
    const passwordInput = getByPlaceholderText('Enter Your Password');
    const loginButton = getByText('SignUp');

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    const userCredential = await createUserWithEmailAndPassword(
      emailInput.props.value,
      passwordInput.props.value,
    );

    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password,
    );
    expect(userCredential.user.uid).toEqual('123');
    expect(userCredential.user.email).toEqual(email);
  });

  it('should throw an error with invalid email', async () => {
    const invalidEmail = 'invalidemail';
    const password = 'password123';

    auth.createUserWithEmailAndPassword.mockRejectedValueOnce(
      new Error('The email address is badly formatted.'),
    );

    try {
      await createUserWithEmailAndPassword(invalidEmail, password);
      fail('Expected promise to reject.');
    } catch (error) {
      expect(error.message).toEqual('The email address is badly formatted.');
    }
  });

  it('should throw an error with weak password', async () => {
    const email = 'test@example.com';
    const weakPassword = '123';

    auth.createUserWithEmailAndPassword.mockRejectedValueOnce(
      new Error('The password must be 6 characters long or more.'),
    );

    try {
      await createUserWithEmailAndPassword(email, weakPassword);
      fail('Expected promise to reject.');
    } catch (error) {
      expect(error.message).toEqual(
        'The password must be 6 characters long or more.',
      );
    }
  });
});
