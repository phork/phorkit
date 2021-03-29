import { render } from '@testing-library/react';
import { Banner } from 'lib';
import * as React from 'react';

describe('<Banner />', () => {
  it('should render a basic banner', () => {
    const { getByText } = render(
      <Banner id="banner" level="info">
        Hello world
      </Banner>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
