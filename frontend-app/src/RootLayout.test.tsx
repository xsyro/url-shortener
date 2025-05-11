import React from 'react';
import { render, screen } from '@testing-library/react';
import { RootLayout } from './RootLayout';

test('renders learn react link', () => {
  // render(<AppLayout />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
