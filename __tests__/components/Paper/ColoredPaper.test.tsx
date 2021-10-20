import React from 'react';
import { ColoredPaper } from 'lib';
import { render } from '../../utils';

describe('<ColoredPaper />', () => {
  it('should render a paper', () => {
    const { getByText } = render(<ColoredPaper colorId="P10">Hello world</ColoredPaper>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
