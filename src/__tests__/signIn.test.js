import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../tabs/SignInView';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      const {getByPlaceholderText, getByTestId } = render(<SignInContainer onPress={onSubmit} />);
      // render the SignInContainer component, fill the text inputs and press the submit button
      fireEvent.changeText(getByPlaceholderText('username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('password'), 'password');
      fireEvent.press(getByTestId('submitButton'));
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
