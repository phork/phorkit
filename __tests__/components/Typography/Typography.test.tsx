import React from 'react';
import { Typography } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { render } from '../../utils';

describe('<Typography />', () => {
  it('should render a typography element', () => {
    const { container, getByText } = render(<Typography>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('should render as a div', () => {
    const { container, getByText } = render(<Typography<'div'> as="div">Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(<Typography<'a'> as={AsTypeA}>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('A');
  });

  it('should accept a single variant', () => {
    const { getByText } = render(<Typography variants="uppercase">Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept an array of variants', () => {
    const { getByText } = render(<Typography variants={['blackout', 'underline']}>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the reset prop', () => {
    const { getByText } = render(<Typography reset>Hello world</Typography>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Typography
        fullWidth
        align="center"
        className="typography"
        color="warning"
        heading="h1"
        id="typography"
        size="xsmall"
        style={{ color: 'red' }}
        themeId="dark"
        volume="quieter"
        weight={500}
      >
        Hello world
      </Typography>,
    );

    const typography = document.getElementById('typography');
    expect(typography?.nodeName).toBe('SPAN');
    expect(typography?.style.getPropertyValue('color')).toBe('red');
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
