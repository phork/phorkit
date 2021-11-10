import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { StyledTag } from 'lib';
import { render } from '../../utils';

const styles = {
  activePrimaryColor: '#798796',
  hoveredPrimaryColor: '#454f58',
  inverseColor: '#fff',
  primaryColor: '#556270',
};

describe('<StyledTag />', () => {
  it('should render a tag', () => {
    const { getByText } = render(<StyledTag {...styles}>Tag me!</StyledTag>);
    expect(getByText('Tag me!')).toBeTruthy();
  });
});
