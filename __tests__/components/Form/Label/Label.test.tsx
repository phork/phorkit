import { render } from '@testing-library/react';
import { Label } from 'lib';
import * as React from 'react';

describe('<Label />', () => {
  it('should render a basic label', () => {
    const { getByText } = render(<Label>Hello world</Label>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
