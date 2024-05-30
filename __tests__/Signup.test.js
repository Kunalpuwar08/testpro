import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Signup from '../src/screens/Auth/Signup';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
    __esModule: true,
    default: () => ({
        createUserWithEmailAndPassword: jest.fn(),
    }),
}));

describe('Signup Component', () => {
    const navigateMock = jest.fn();

    beforeAll(() => {
        useNavigation.mockReturnValue({ navigate: navigateMock });
    });

    beforeEach(() => {
        navigateMock.mockClear();
        auth().createUserWithEmailAndPassword.mockClear();
    });

    test('renders correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<Signup />);

        await waitFor(() => {
            expect(getByText('My APP')).toBeTruthy();
            expect(getByPlaceholderText('Enter Your Email')).toBeTruthy();
            expect(getByPlaceholderText('Enter Your Password')).toBeTruthy();
            expect(getByText('Login')).toBeTruthy();
            expect(getByText("Don't have an account")).toBeTruthy();
        }, { timeout: 10000 });

        test('handles email and password input', () => {
            const { getByPlaceholderText } = render(<Signup />);
            const emailInput = getByPlaceholderText('Enter Your Email');
            const passwordInput = getByPlaceholderText('Enter Your Password');

            fireEvent.changeText(emailInput, 'test@example.com');
            fireEvent.changeText(passwordInput, 'password123');

            expect(emailInput.props.value).toBe('test@example.com');
            expect(passwordInput.props.value).toBe('password123');
        });

        test('calls onSignup and navigates on successful signup', async () => {
            auth().createUserWithEmailAndPassword.mockResolvedValueOnce();
            const { getByText, getByPlaceholderText } = render(<Signup />);

            const emailInput = getByPlaceholderText('Enter Your Email');
            const passwordInput = getByPlaceholderText('Enter Your Password');
            const loginButton = getByText('Login');

            fireEvent.changeText(emailInput, 'test@example.com');
            fireEvent.changeText(passwordInput, 'password123');
            fireEvent.press(loginButton);

            await waitFor(() => {
                expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
                expect(navigateMock).toHaveBeenCalledWith('Auth');
            });
        });

        test('handles signup errors', async () => {
            const error = new Error('auth/email-already-in-use');
            error.code = 'auth/email-already-in-use';
            auth().createUserWithEmailAndPassword.mockRejectedValueOnce(error);

            console.log = jest.fn();

            const { getByText, getByPlaceholderText } = render(<Signup />);
            const emailInput = getByPlaceholderText('Enter Your Email');
            const passwordInput = getByPlaceholderText('Enter Your Password');
            const loginButton = getByText('Login');

            fireEvent.changeText(emailInput, 'test@example.com');
            fireEvent.changeText(passwordInput, 'password123');
            fireEvent.press(loginButton);

            await waitFor(() => {
                expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
                expect(console.log).toHaveBeenCalledWith('That email address is already in use!');
            });
        });

        test('navigates to signup screen on pressing the signup link', () => {
            const { getByText } = render(<Signup />);
            const signupLink = getByText("Don't have an account");

            fireEvent.press(signupLink);
            expect(navigateMock).toHaveBeenCalledWith('Signup');
        });
    })
})
