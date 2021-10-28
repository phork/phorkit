import { render } from '@testing-library/react';
import React from 'react';
import { PhorkIcon, StatusBubble } from 'lib';

describe('<StatusBubble />', () => {
  it('should render a status bubble', () => {
    const { container, queryByText } = render(
      <StatusBubble header="Header" icon={<PhorkIcon scale="large" />}>
        Hello world
      </StatusBubble>,
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
