import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { FormboxContainer } from 'lib';

describe('FormboxContainer', () => {
  it('renders correctly with default props', () => {
    render(
      <FormboxContainer type="input">
        <input type="text" />
      </FormboxContainer>,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a label when provided', () => {
    render(
      <FormboxContainer label="Test Label" type="input">
        <input type="text" />
      </FormboxContainer>,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('supports different container element types', () => {
    render(
      <FormboxContainer<'div'> as="div" type="input">
        <input type="text" />
      </FormboxContainer>,
    );
    expect(screen.getByRole('textbox').closest('div')).toBeInTheDocument();
  });

  it('handles custom widths correctly', () => {
    render(
      <FormboxContainer type="input" width={300}>
        <input type="text" />
      </FormboxContainer>,
    );
    const container = screen.getByRole('textbox').closest('label');
    expect(container).toHaveStyle({ width: '300px' });
  });

  it('applies readOnly attributes correctly', () => {
    render(
      <FormboxContainer readOnly type="input">
        <input readOnly type="text" />
      </FormboxContainer>,
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('readOnly');
  });

  it('disables input when disabled prop is provided', () => {
    render(
      <FormboxContainer disabled type="input">
        <input disabled type="text" />
      </FormboxContainer>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
});
