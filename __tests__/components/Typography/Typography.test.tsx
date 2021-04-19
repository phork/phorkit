import { render } from '@testing-library/react';
import * as React from 'react';
import { AsTypeA } from '__mocks__/AsType.mock';
import { Typography } from 'lib';

describe('<Typography />', () => {
  it('should render a basic typography element', () => {
    const { getByText } = render(<Typography>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a typography element using a functional component', () => {
    const { container, getByText } = render(<Typography<'a'> as={AsTypeA}>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('A');
  });
});
