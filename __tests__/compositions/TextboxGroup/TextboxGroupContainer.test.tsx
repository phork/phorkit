import React from 'react';
import { TextboxGroupContainer } from 'lib';
import { render } from '../../utils';

describe('<TextboxGroupContainer />', () => {
  it('should render', () => {
    const { queryByText } = render(<TextboxGroupContainer>Hello world</TextboxGroupContainer>);
    expect(queryByText('Hello world')).toBeTruthy();
  });
});
