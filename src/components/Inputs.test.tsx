import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Sort from './Sort';
import Search from './Search';

vi.mock('@ionic/react', () => ({
  IonButton: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  IonInput: ({ onIonChange, ...props }: any) => <input {...props} onChange={event => onIonChange({ detail: { value: event.target.value } })} />,
}));

test.each([Sort, Search])('zero and blank element counts do not crash generation', async Component => {
  render(<Component name="Test" />);
  const input = screen.getByRole('spinbutton');
  await act(async () => { fireEvent.click(screen.getByText(/Generate .*Array/)); });
  expect(document.querySelectorAll('.inner-unit-class')).toHaveLength(5);
  fireEvent.change(input, { target: { value: '0' } });
  await act(async () => { fireEvent.click(screen.getByText(/Generate .*Array/)); });
  expect(document.querySelectorAll('.inner-unit-class')).toHaveLength(0);
  fireEvent.change(input, { target: { value: '' } });
  await act(async () => { fireEvent.click(screen.getByText(/Generate .*Array/)); });
  expect(document.querySelectorAll('.inner-unit-class')).toHaveLength(0);
});

test('generation and element input are locked while bubble sort runs', () => {
  vi.useFakeTimers();
  const { unmount } = render(<Sort name="Test" />);
  fireEvent.click(screen.getByText('Generate Random Array'));
  fireEvent.click(screen.getByText('Use Bubble Sort to Sort Array'));
  expect(screen.getByText('Generate Random Array')).toBeDisabled();
  expect(screen.getByRole('spinbutton')).toBeDisabled();
  unmount();
  vi.clearAllTimers();
  vi.useRealTimers();
});
