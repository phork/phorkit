import { render } from '@testing-library/react';
import { Flex } from 'lib';
import * as React from 'react';

describe('<Flex />', () => {
  it('should render a basic flex container', () => {
    const { getByText } = render(<Flex>Hello world</Flex>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
