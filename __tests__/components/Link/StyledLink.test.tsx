import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { StyledLink } from 'lib';
import { render } from '../../utils';

const styles = {
  activeColor: '#f18100',
  hoveredColor: '#ff8e0d',
  textColor: '#ff9b28',
};

describe('<StyledLink />', () => {
  it('should render a link', () => {
    const { container, getByText } = render(
      <StyledLink href="#link" {...styles}>
        Click me!
      </StyledLink>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#link');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
