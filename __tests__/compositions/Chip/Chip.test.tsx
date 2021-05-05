import { render } from '@testing-library/react';
import * as React from 'react';
import { Chip } from 'lib';

describe('<Chip />', () => {
  it('should render a basic chip', () => {
    const { getByText } = render(<Chip avatar={{ initials: 'EC' }} text="Hello world" />);
    expect(getByText('EC')).toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });
});
