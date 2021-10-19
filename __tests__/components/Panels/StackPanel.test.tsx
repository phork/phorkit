import React from 'react';
import { StackPanel } from 'lib';
import { render } from '../../utils';

describe('<StackPanel />', () => {
  it('should render a stack panel', () => {
    const { getByText } = render(
      <StackPanel height={200} position="top">
        Hello world
      </StackPanel>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
