import React from 'react';
import { Toast } from 'lib';
import { fireEvent, render } from '../../utils';

describe('<Toast />', () => {
  it('should render a toast', () => {
    const { getByText } = render(
      <Toast immediate permanent level="success">
        This is a success toast.
      </Toast>,
    );
    expect(getByText('This is a success toast.')).toBeTruthy();
  });

  it('should render a toast with a close button', () => {
    const onClose = jest.fn();

    const { getByRole } = render(
      <Toast contextId="toast" level="success" onClose={onClose}>
        Hello world
      </Toast>,
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
      <Toast contextId="toast" duration={5000} level="success" onPin={onPin}>
        Hello world
      </Toast>,
    );

    expect(onPin).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onPin).toHaveBeenCalledTimes(1);
    expect(onPin.mock.calls[onPin.mock.calls.length - 1][1]).toBe('toast');
  });
});
