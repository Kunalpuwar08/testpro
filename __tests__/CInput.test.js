import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CInput from '../src/components/CInput';

describe('TextInput Component', () => {
    test('renders with a label', () => {
        const { getByText } = render(<CInput label="Name:" value="" onChange={() => { }} />);
        const labelElement = getByText(/Name:/i);
        expect(labelElement).toBeTruthy();
    });

    test('renders with the correct initial value', () => {
        const { getByDisplayValue } = render(<CInput label="Name:" value="John Doe" onChange={() => { }} />);
        const inputElement = getByDisplayValue(/John Doe/i);
        expect(inputElement).toBeTruthy();
    });

    test('calls onChange handler when input value changes', () => {
        const handleChange = jest.fn();
        const { getByTestId } = render(<CInput label="Name:" value="" onChange={handleChange} />);
        const inputElement = getByTestId('text-input');
        fireEvent.changeText(inputElement, 'Jane Doe');
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('Jane Doe');
    });

    test('updates the value when props change', () => {
        const { getByDisplayValue, rerender } = render(<CInput label="Name:" value="John Doe" onChange={() => { }} />);
        const inputElement = getByDisplayValue(/John Doe/i);
        expect(inputElement.props.value).toBe('John Doe');

        rerender(<CInput label="Name:" value="Jane Doe" onChange={() => { }} />);
        expect(inputElement.props.value).toBe('Jane Doe');
    });
});
