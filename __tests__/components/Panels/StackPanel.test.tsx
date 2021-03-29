import { render } from '@testing-library/react';
import { StackPanel } from 'lib';
import * as React from 'react';

describe('<StackPanel />', () => {
  it('should render a stack panel', () => {
    const { getByText } = render(
      <StackPanel position="top" height={200}>
        Hello world
      </StackPanel>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
