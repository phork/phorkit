import { render } from '@testing-library/react';
import React from 'react';
import { StatusBubble } from 'lib';

describe('<StatusBubble />', () => {
  it('should render a status bubble', () => {
    const { queryByText } = render(
      <StatusBubble anchor={<div>Anchor</div>} header="Header">
        Hello world
      </StatusBubble>,
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();
    expect(queryByText('Anchor')).toBeTruthy();
  });
});
