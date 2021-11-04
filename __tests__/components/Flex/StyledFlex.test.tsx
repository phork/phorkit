import React from 'react';
import { StyledFlex } from 'lib';
import { render } from '../../utils';

describe('<StyledFlex />', () => {
  it('should render a flex container', () => {
    const { getByText } = render(
      <StyledFlex flex="1" flexBasis={1} flexGrow={1} flexShrink={1}>
        Hello world
      </StyledFlex>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
