import { render } from '@testing-library/react';
import * as React from 'react';
import { AsTypeA } from '__mocks__/AsType.mock';
import { Label } from 'lib';

describe('<Label />', () => {
  it('should render a basic label', () => {
    const { getByText } = render(<Label>Hello world</Label>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a label using a functional component', () => {
    const { container, getByText } = render(<Label<'a'> as={AsTypeA}>Hello world</Label>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('A');
  });
});
