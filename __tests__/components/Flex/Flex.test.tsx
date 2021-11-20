import React from 'react';
import { Flex } from 'lib';
import { render } from '../../utils';

describe('<Flex />', () => {
  it('should render a flex container', () => {
    const { getByText } = render(<Flex>Hello world</Flex>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept all the props', () => {
    const { getByText } = render(
      <Flex
        flexible
        full
        inline
        max
        reverse
        wrap
        alignContent="center"
        alignItems="center"
        alignSelf="center"
        direction="row"
        id="flex"
        justifyContent="center"
      >
        Hello world
      </Flex>,
    );

    expect(document.getElementById('flex')).toBeTruthy();
    expect(getByText('Hello world')).toBeTruthy();
  });
});
