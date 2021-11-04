import React from 'react';
import { StyledTitledToast } from 'lib';
import { render } from '../../utils';

const styles = {
  levelColor: '#556270',
  levelInverseColor: '#fff',
};

describe('<StyledTitledToast />', () => {
  it('should render a toast with a title', () => {
    const { getByText } = render(
      <StyledTitledToast immediate title="Hello world" {...styles}>
        This is a styled toast.
      </StyledTitledToast>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('This is a styled toast.')).toBeTruthy();
  });
});
