import { render } from '@testing-library/react';
import * as React from 'react';
import { Rhythm } from 'lib';

describe('<Rhythm />', () => {
  it('should render a basic rhythm container', () => {
    const { getByText } = render(<Rhythm m={3}>Hello world</Rhythm>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
