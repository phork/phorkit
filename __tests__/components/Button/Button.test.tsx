import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { Button } from 'lib';
import * as React from 'react';

describe('<Button />', () => {
  it('should render a basic button with children', () => {
    const { container, getByText } = render(<Button>Click me!</Button>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a button as an anchor', () => {
    const { container, getByText } = render(
      <Button<'a'> as="a" href="#button">
        Click me!
      </Button>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#button');
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me!</Button>);

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
