import { render } from '@testing-library/react';
import * as React from 'react';
import { PanelContainer } from 'lib';

describe('<PanelContainer />', () => {
  it('should render a panel container', () => {
    const { getByText } = render(<PanelContainer orientation="vertical">Hello world</PanelContainer>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
