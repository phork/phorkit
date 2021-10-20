import React from 'react';
import { PortalDropover, DropoverLabel, DropoverContent } from 'lib';
import { fireEvent, render } from '../../utils';

describe('<PortalDropover />', () => {
  it('should render a portal dropover', () => {
    const { getByText } = render(
      <PortalDropover label={<DropoverLabel>Super fantastic label</DropoverLabel>}>
        <DropoverContent>Hello world</DropoverContent>
      </PortalDropover>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onOpen = jest.fn();

    const { getByTestId, getByText } = render(
      <PortalDropover label={<DropoverLabel data-testid="button">Super fantastic label</DropoverLabel>} onOpen={onOpen}>
        <DropoverContent>Hello world</DropoverContent>
      </PortalDropover>,
    );

    const button = getByTestId('button');
    fireEvent.click(button);

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
