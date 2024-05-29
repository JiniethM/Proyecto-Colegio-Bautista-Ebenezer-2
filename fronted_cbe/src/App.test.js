import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Inicio de Sesión', () => {
  render(<App />);
  const linkElement = screen.getByText(/Inicio de Sesión/i);
  expect(linkElement).toBeInTheDocument();
});

