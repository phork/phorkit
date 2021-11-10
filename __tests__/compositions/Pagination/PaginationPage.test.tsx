import React from 'react';
import { PaginationPage } from 'lib';
import { AsTypeDiv } from '__mocks__/AsType.mock';
import { render } from '../../utils';

describe('<PaginationPage />', () => {
  it('should render a page button', () => {
    const { container, getByText } = render(<PaginationPage page={12345} />);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(getByText('12345')).toBeTruthy();
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(<PaginationPage<'div'> as={AsTypeDiv} page={12345} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(getByText('12345')).toBeTruthy();
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const { getByTestId } = render(<PaginationPage data-testid="page" page={12345} ref={ref} />);

    expect(getByTestId('page')).toBe(ref.current);
  });
});
