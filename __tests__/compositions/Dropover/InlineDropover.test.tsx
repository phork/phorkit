import { fireEvent, render } from '@testing-library/react';
import { InlineDropover, DropoverLabel, DropoverContent } from 'lib';
import * as React from 'react';

describe('<InlineDropover />', () => {
  it('should render a basic inline dropover', () => {
    const { getByText } = render(
      <InlineDropover label={<DropoverLabel>Super fantastic label</DropoverLabel>}>
        <DropoverContent>Hello world</DropoverContent>
      </InlineDropover>,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should be clickable', () => {
    const onOpen = jest.fn();

    const { getByText, getByRole } = render(
      <InlineDropover onOpen={onOpen} label={<DropoverLabel>Super fantastic label</DropoverLabel>}>
        <DropoverContent>Hello world</DropoverContent>
      </InlineDropover>,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
