import React from 'react';
import { Flex } from 'lib';
import { render } from '../../utils';

describe('<Flex />', () => {
  it('should render a basic flex container', () => {
    const { getByText } = render(<Flex>Hello world</Flex>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
