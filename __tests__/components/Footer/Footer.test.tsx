import { render } from '@testing-library/react';
import { Footer } from 'lib';
import * as React from 'react';

describe('<Footer />', () => {
  it('should render a basic footer', () => {
    const { getByText } = render(<Footer>Hello world</Footer>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
