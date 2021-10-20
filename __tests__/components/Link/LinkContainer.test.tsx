import React from 'react';
import { LinkContainer } from 'lib';
import { AsTypeP } from '__mocks__/AsType.mock';
import { render } from '../../utils';

describe('<LinkContainer />', () => {
  it('should render a link container', () => {
    const { container, getByText } = render(
      <LinkContainer>
        <a href="#linkcontainer">Click me!</a>
      </LinkContainer>,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(container.querySelectorAll('a').length).toBe(1);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render as a paragraph', () => {
    const { container, getByText } = render(
      <LinkContainer as="p">
        <a href="#linkcontainer">Click me!</a>
      </LinkContainer>,
    );
    expect(container.firstChild?.nodeName).toBe('P');
    expect(container.querySelectorAll('a').length).toBe(1);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(
      <LinkContainer<'p'> as={AsTypeP}>
        <a href="#linkcontainer">Click me!</a>
      </LinkContainer>,
    );
    expect(container.firstChild?.nodeName).toBe('P');
    expect(container.querySelectorAll('a').length).toBe(1);
    expect(getByText('Click me!')).toBeTruthy();
  });
});
