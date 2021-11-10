import React from 'react';
import { Typography } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { render } from '../../utils';

describe('<Typography />', () => {
  it('should render a typography element', () => {
    const { getByText } = render(<Typography>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(<Typography<'a'> as={AsTypeA}>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('should accept a ref', () => {
    const ref = React.createRef<JSX.IntrinsicElements['span']>();
    const { getByTestId } = render(
      <Typography data-testid="typography" ref={ref}>
        Hello world
      </Typography>,
    );

    expect(getByTestId('typography')).toBe(ref.current);
  });
});
