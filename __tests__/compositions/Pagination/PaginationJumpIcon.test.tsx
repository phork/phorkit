import React from 'react';
import { PaginationJumpIcon } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';
import { render } from '../../utils';

describe('<PaginationJumpIcon />', () => {
  it('should render a basic pagination icon jump button', () => {
    const { container } = render(<PaginationJumpIcon page={12} title="First page" type="first" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a pagination icon jump button using a functional component', () => {
    const { container } = render(
      <PaginationJumpIcon<'div'> as={AsTypeDiv} page={12} title="First page" type="first" />,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
