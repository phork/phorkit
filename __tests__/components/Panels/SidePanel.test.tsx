import { render } from '@testing-library/react';
import { SidePanel } from 'lib';
import * as React from 'react';

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