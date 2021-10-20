import React from 'react';
import { Header } from 'lib';
import { render } from '../../utils';

describe('<Header />', () => {
  it('should render a header', () => {
    const { getByText } = render(<Header>Hello world</Header>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
