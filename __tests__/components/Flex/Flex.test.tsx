import { render } from '@testing-library/react';
import * as React from 'react';
import { Flex } from 'lib';

describe('<Flex />', () => {
  it('should render a basic flex container', () => {
    const { getByText } = render(<Flex>Hello world</Flex>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
