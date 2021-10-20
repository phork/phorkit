import React from 'react';
import { Banner } from 'lib';
import { fireEvent, render } from '../../utils';

describe('<Banner />', () => {
  it('should render a banner', () => {
    const { getByText } = render(
      <Banner immediate permanent level="info">
        Hello world
      </Banner>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a banner with a close button', () => {
    const onClose = jest.fn();

    const { getByRole } = render(
      <Banner contextId="banner" level="info" onClose={onClose}>
        Hello world
      </Banner>,
    );

    expect(onClose).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[onClose.mock.calls.length - 1][1]).toBe('banner');
  });
});
