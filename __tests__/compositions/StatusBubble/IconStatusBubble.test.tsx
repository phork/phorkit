import { render } from '@testing-library/react';
import React from 'react';
import { PhorkIcon, IconStatusBubble } from 'lib';

describe('<IconStatusBubble />', () => {
  it('should render an icon status bubble', () => {
    const { container, queryByText } = render(
      <IconStatusBubble header="Header" icon={<PhorkIcon scale="large" />}>
        Hello world
      </IconStatusBubble>,
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
