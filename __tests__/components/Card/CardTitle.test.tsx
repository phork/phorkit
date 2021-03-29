import { render } from '@testing-library/react';
import { CardTitle } from 'lib';
import * as React from 'react';

describe('<CardTitle />', () => {
  it('should render a basic card title', () => {
    const { getByText } = render(<CardTitle>Hello world</CardTitle>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
