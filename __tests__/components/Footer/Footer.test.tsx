import { render } from '@testing-library/react';
import * as React from 'react';
import { Footer } from 'lib';

describe('<Footer />', () => {
  it('should render a basic footer', () => {
    const { getByText } = render(<Footer>Hello world</Footer>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
