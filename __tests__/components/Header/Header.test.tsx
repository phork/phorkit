import { render } from '@testing-library/react';
import { Header } from 'lib';
import * as React from 'react';

describe('<Header />', () => {
  it('should render a basic header', () => {
    const { getByText } = render(<Header>Hello world</Header>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
