import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { IconButton, TimesIcon } from 'lib';
import * as React from 'react';

describe('<IconButton />', () => {
  it('should render a basic icon button', () => {
    const { container } = render(
      <IconButton>
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render an icon button as an anchor', () => {
    const { container } = render(
      <IconButton<'a'> as="a" href="#iconbutton">
        <TimesIcon scale="medium" />
      </IconButton>,
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#iconbutton');
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <IconButton onClick={onClick}>
        <TimesIcon scale="medium" />
      </IconButton>,
    );

    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
