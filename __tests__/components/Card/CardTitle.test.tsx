import { render } from '@testing-library/react';
import React from 'react';
import { CardTitle } from 'lib';

describe('<CardTitle />', () => {
  it('should render a basic card title', () => {
    const { getByText } = render(<CardTitle>Hello world</CardTitle>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
