import { render } from '@testing-library/react';
import React from 'react';
import { PaginationPage } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';

describe('<PaginationPage />', () => {
  it('should render a basic pagination page', () => {
    const { container, getByText } = render(<PaginationPage page={12345} />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(getByText('12345')).toBeTruthy();
  });

  it('should render a pagination page using a functional component', () => {
    const { container, getByText } = render(<PaginationPage<'div'> as={AsTypeDiv} page={12345} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(getByText('12345')).toBeTruthy();
  });
});
