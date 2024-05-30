import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyButton from '../src/components/MyButton';

describe('MyButton', () => {
  it('calls the onPress handler when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<MyButton onPress={onPressMock} title="Press me" />);

    fireEvent.press(getByText('Press me'));
    
    expect(onPressMock).toHaveBeenCalled();
  });

  it('displays the correct title', () => {
    const { getByText } = render(<MyButton onPress={() => {}} title="Press me" />);
    
    expect(getByText('Press me')).not.toBeNull();
  });
});
