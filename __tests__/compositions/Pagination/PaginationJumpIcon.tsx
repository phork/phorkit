import { render } from '@testing-library/react';
import React from 'react';
import { PaginationJumpIcon } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';

describe('<PaginationJumpIcon />', () => {
  it('should render a basic pagination icon jump button', () => {
    const { container } = render(<PaginationJumpIcon page={12} type="first" title="First page" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a pagination icon jump button using a functional component', () => {
    const { container } = render(
      <PaginationJumpIcon<'div'> page={12} as={AsTypeDiv} type="first" title="First page" />,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
