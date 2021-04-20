import { render } from '@testing-library/react';
import React from 'react';
import { SidePanel } from 'lib';

describe('<SidePanel />', () => {
  it('should render a side panel', () => {
    const { getByText } = render(
      <SidePanel position="left" width={200}>
        Hello world
      </SidePanel>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
