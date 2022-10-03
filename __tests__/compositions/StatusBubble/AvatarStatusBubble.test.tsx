import { render } from '@testing-library/react';
import React from 'react';
import { AvatarStatusBubble } from 'lib';

describe('<AvatarStatusBubble />', () => {
  it('should render an avatar status bubble with initials', () => {
    const { queryByText } = render(
      <AvatarStatusBubble header="Header" initials="P">
        Hello world
      </AvatarStatusBubble>,
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();
    expect(queryByText('P')).toBeTruthy();
  });

  it('should render an avatar status bubble with an image', () => {
    const { queryByText, queryByRole } = render(
      <AvatarStatusBubble header="Header" imgSrc="/avatar.png" initials="P">
        Hello world
      </AvatarStatusBubble>,
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();

    const avatar = queryByRole('img');
    expect(avatar?.style.getPropertyValue('background-image')).toBe('url(/avatar.png)');
  });
});
