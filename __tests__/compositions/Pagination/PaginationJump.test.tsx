import { render } from '@testing-library/react';
import React from 'react';
import { PaginationJump } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';

describe('<PaginationJump />', () => {
  it('should render a basic pagination jump button', () => {
    const { container, queryByText } = render(<PaginationJump page={12} type="first" title="First page" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(queryByText('First page')).toBeTruthy();
  });

  it('should render a pagination page using a functional component', () => {
    const { container, queryByText } = render(
      <PaginationJump<'div'> page={12} as={AsTypeDiv} type="first" title="First page" />,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(queryByText('First page')).toBeTruthy();
  });
});
