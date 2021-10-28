import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { SizeProvider } from 'lib';
import { render } from '../../utils';

describe('<SizeProvider />', () => {
  it('should render the children', () => {
    const { getByText } = render(<SizeProvider>{ref => <div ref={ref}>Hello world</div>}</SizeProvider>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
