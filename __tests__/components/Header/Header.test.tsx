import React from 'react';
import { Header } from 'lib';
import { render } from '../../utils';

describe('<Header />', () => {
  it('should render a header', () => {
    const { getByText } = render(<Header>Hello world</Header>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render the contrast colors', () => {
    const { getByText } = render(<Header contrast>Hello world</Header>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    const { getByText } = render(
      <Header full transparent unthemed bordered="pseudo" className="headerTest" variant="primary" volume="quiet">
        Hello world
      </Header>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
