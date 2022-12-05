import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

it('app renders and includes title', () => {
  render(<App />);
  const title = screen.getByText(/fact calendar/i);
  expect(title).toBeInTheDocument();
});