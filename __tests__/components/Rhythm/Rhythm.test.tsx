import React from 'react';
import { Rhythm } from 'lib';
import { render } from '../../utils';

describe('<Rhythm />', () => {
  it('should render a rhythm container with a string child', () => {
    const { container, getByText } = render(<Rhythm>Hello world</Rhythm>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.querySelectorAll('div').length).toBe(1);
  });

  it('should render a rhythm container with an element child', () => {
    const { container, getByText } = render(
      <Rhythm>
        <div>Hello world</div>
      </Rhythm>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.querySelectorAll('div').length).toBe(1);
  });

  it('should render a wrapped rhythm container', () => {
    const { container, getByText } = render(<Rhythm wrapper="span">Hello world</Rhythm>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.querySelectorAll('div').length).toBe(0);
    expect(container.querySelectorAll('span').length).toBe(1);
  });

  it('should render a grouped rhythm container', () => {
    const { container, getAllByText } = render(
      <Rhythm grouped>
        <div>Hello world</div>
        <div>Hello world</div>
      </Rhythm>,
    );
    expect(getAllByText('Hello world')).toBeTruthy();
    expect(container.querySelectorAll('div').length).toBe(3);
  });

  it('should render a grouped and wrapped rhythm container', () => {
    const { container, getAllByText } = render(
      <Rhythm grouped wrapper="span">
        <span>Hello world</span>
        <span>Hello world</span>
      </Rhythm>,
    );
    expect(getAllByText('Hello world')).toBeTruthy();
    expect(container.querySelectorAll('span').length).toBe(3);
  });

  it('should accept top/right/bottom/left margin props', () => {
    const { getByText } = render(
      <Rhythm mb={3} ml={3} mr={3} mt={3}>
        Hello world
      </Rhythm>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept negative top/right/bottom/left margin props', () => {
    const { getByText } = render(
      <Rhythm mb={-3} ml={-3} mr={-3} mt={-3}>
        Hello world
      </Rhythm>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept x/y margin props', () => {
    const { getByText } = render(
      <Rhythm mx={3} my={3}>
        Hello world
      </Rhythm>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept an auto margin', () => {
    const { getByText } = render(<Rhythm mx="auto">Hello world</Rhythm>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept a margin prop', () => {
    const { getByText } = render(<Rhythm m={3}>Hello world</Rhythm>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept top/right/bottom/left padding props', () => {
    const { getByText } = render(
      <Rhythm pb={3} pl={3} pr={3} pt={3}>
        Hello world
      </Rhythm>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept x/y padding props', () => {
    const { getByText } = render(
      <Rhythm px={3} py={3}>
        Hello world
      </Rhythm>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept a padding prop', () => {
    const { getByText } = render(<Rhythm p={3}>Hello world</Rhythm>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Rhythm className="rhythm" id="rhythm" p={3} style={{ color: 'red' }}>
        Hello world
      </Rhythm>,
    );

    const rhythm = document.getElementById('rhythm');
    expect(rhythm?.nodeName).toBe('DIV');
    expect(rhythm?.style.getPropertyValue('color')).toBe('red');
  });
});
