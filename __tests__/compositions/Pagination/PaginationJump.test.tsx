import React from 'react';
import { PaginationJump } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';
import { render } from '../../utils';

describe('<PaginationJump />', () => {
  it('should render a jump button', () => {
    const { container, queryByText } = render(<PaginationJump page={12} title="First page" type="first" />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(queryByText('First page')).toBeTruthy();
  });

  it('should render using a functional component', () => {
    const { container, queryByText } = render(
      <PaginationJump<'div'> as={AsTypeDiv} page={12} title="First page" type="first" />,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(queryByText('First page')).toBeTruthy();
  });
});
