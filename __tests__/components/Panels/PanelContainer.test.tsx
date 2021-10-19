import React from 'react';
import { PanelContainer } from 'lib';
import { render } from '../../utils';

describe('<PanelContainer />', () => {
  it('should render a panel container', () => {
    const { getByText } = render(<PanelContainer orientation="vertical">Hello world</PanelContainer>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
