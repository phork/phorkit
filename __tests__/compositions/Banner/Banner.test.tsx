import { render } from '@testing-library/react';
import React from 'react';
import { Banner } from 'lib';

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
