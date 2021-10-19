import React from 'react';
import { Rhythm } from 'lib';
import { render } from '../../utils';

describe('<Rhythm />', () => {
  it('should render a basic rhythm container', () => {
    const { getByText } = render(<Rhythm m={3}>Hello world</Rhythm>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
