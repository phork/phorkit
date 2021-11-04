import React from 'react';
import { StyledCard } from 'lib';
import { render } from '../../utils';

const styles = {
  borderColor: '#c5106b',
  hoveredBorderColor: '#642da0',
};

describe('<StyledCard />', () => {
  it('should render a card', () => {
    const { getByText } = render(<StyledCard {...styles}>Hello world</StyledCard>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
