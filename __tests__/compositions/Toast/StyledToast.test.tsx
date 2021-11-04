import React from 'react';
import { StyledToast } from 'lib';
import { fireEvent, render } from '../../utils';

const styles = {
  levelColor: '#556270',
  levelInverseColor: '#fff',
};

describe('<StyledToast />', () => {
  it('should render a toast', () => {
    const { getByText } = render(
      <StyledToast immediate permanent {...styles}>
        This is a styled toast.
      </StyledToast>,
    );
    expect(getByText('This is a styled toast.')).toBeTruthy();
  });

  it('should render a toast with a close button', () => {
    const onClose = jest.fn();

    const { getByRole } = render(
      <StyledToast contextId="toast" onClose={onClose} {...styles}>
        Hello world
      </StyledToast>,
    );

    expect(onClose).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[onClose.mock.calls.length - 1][1]).toBe('toast');
  });

  it('should render a toast with a pin button', () => {
    const onPin = jest.fn();

    const { getByRole } = render(
      <StyledToast contextId="toast" duration={5000} onPin={onPin} {...styles}>
        Hello world
      </StyledToast>,
    );

    expect(onPin).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onPin).toHaveBeenCalledTimes(1);
    expect(onPin.mock.calls[onPin.mock.calls.length - 1][1]).toBe('toast');
  });
});
