import { render } from '@testing-library/react';
import React from 'react';
import { StatusBubble } from 'lib';
import { BlobbrIcon } from '../../../src/icons/internal';

describe('<StatusBubble />', () => {
  it('should render a status bubble', () => {
    const { container, queryByText } = render(
      <StatusBubble header="Header" icon={<BlobbrIcon scale="large" />}>
        Hello world
      </StatusBubble>,
    );

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
