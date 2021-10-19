import React from 'react';
import { Banner } from 'lib';
import { render } from '../../utils';

describe('<Banner />', () => {
  it('should render a basic banner', () => {
    const { getByText } = render(
      <Banner contextId="banner" level="info">
        Hello world
      </Banner>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
