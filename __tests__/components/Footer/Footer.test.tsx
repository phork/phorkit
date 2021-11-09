import React from 'react';
import { Footer } from 'lib';
import { render } from '../../utils';

describe('<Footer />', () => {
  it('should render a footer', () => {
    const { getByText } = render(<Footer>Hello world</Footer>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render the contrast colors', () => {
    const { getByText } = render(<Footer contrast>Hello world</Footer>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    const { getByText } = render(
      <Footer full transparent unthemed bordered="pseudo" className="footerTest" variant="primary" volume="quiet">
        Hello world
      </Footer>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
