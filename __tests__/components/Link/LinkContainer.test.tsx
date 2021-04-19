import { render } from '@testing-library/react';
import * as React from 'react';
import { AsTypeP } from '__mocks__/AsType.mock';
import { LinkContainer } from 'lib';

describe('<LinkContainer />', () => {
  it('should render a basic link container', () => {
    const { container, getByText } = render(
      <LinkContainer>
        <a href="#linkcontainer">Click me!</a>
      </LinkContainer>,
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(container.querySelectorAll('a').length).toBe(1);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a link container as a paragraph', () => {
    const { container, getByText } = render(
      <LinkContainer as="p">
        <a href="#linkcontainer">Click me!</a>
      </LinkContainer>,
    );
    expect(container.firstChild?.nodeName).toBe('P');
    expect(container.querySelectorAll('a').length).toBe(1);
    expect(getByText('Click me!')).toBeTruthy();
  });

  it('should render a link container using a functional component', () => {
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
