import { render } from '@testing-library/react';
import { AsTypeDiv } from '__mocks__/AsType.mock';
import { PaginationJump } from 'lib';
import * as React from 'react';

describe('<PaginationJump />', () => {
  it('should render a basic pagination jump button', () => {
    const { container } = render(<PaginationJump page={12} type="first" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a pagination page using a functional component', () => {
    const { container } = render(<PaginationJump<'div'> page={12} as={AsTypeDiv} type="first" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
