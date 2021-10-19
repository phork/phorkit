import React from 'react';
import { Fieldset } from 'lib';
import { render } from '../../../utils';

describe('<Fieldset />', () => {
  it('should render a basic fieldset', () => {
    const { getByText } = render(<Fieldset>Hello world</Fieldset>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a basic fieldset with a legend', () => {
    const { getByText } = render(<Fieldset legend="Legendary">Hello world</Fieldset>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('Legendary')).toBeTruthy();
  });
});
