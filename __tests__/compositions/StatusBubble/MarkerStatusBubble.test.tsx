import { render } from '@testing-library/react';
import React from 'react';
import { MarkerStatusBubble } from 'lib';

describe('<MarkerStatusBubble />', () => {
  it('should render a marker status bubble', () => {
    const { queryByText } = render(<MarkerStatusBubble header="Header">Hello world</MarkerStatusBubble>);

    expect(queryByText('Header')).toBeTruthy();
    expect(queryByText('Hello world')).toBeTruthy();
  });
});
