import { render } from '@testing-library/react';
import React from 'react';
import { TextboxGroupContainer } from 'lib';

describe('<TextboxGroupContainer />', () => {
  it('should render', () => {
    const { queryByText } = render(<TextboxGroupContainer>Hello world</TextboxGroupContainer>);
    expect(queryByText('Hello world')).toBeTruthy();
  });
});
