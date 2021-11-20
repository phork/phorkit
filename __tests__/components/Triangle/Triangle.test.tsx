import React from 'react';
import { Triangle } from 'lib';
import { render } from '../../utils';

describe('<Triangle />', () => {
  it('should render a triangle', () => {
    const { container } = render(<Triangle position="bottom" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a bottom-left triangle', () => {
    const { getByTestId } = render(<Triangle color="yellow" data-testid="triangle" position="bottom-left" size={12} />);

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-bottom')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-left')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-right')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-top')).toBe('12px solid transparent');
  });

  it('should render a bottom-right triangle', () => {
    const { getByTestId } = render(
      <Triangle color="yellow" data-testid="triangle" position="bottom-right" size={12} />,
    );

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-bottom')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-left')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-right')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-top')).toBe('12px solid transparent');
  });

  it('should render a bottom triangle', () => {
    const { getByTestId } = render(<Triangle color="yellow" data-testid="triangle" position="bottom" size={12} />);

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-left')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-right')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-top')).toBe('12px solid yellow');
  });

  it('should render a left triangle', () => {
    const { getByTestId } = render(<Triangle color="yellow" data-testid="triangle" position="left" size={12} />);

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-bottom')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-right')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-top')).toBe('12px solid transparent');
  });

  it('should render a right triangle', () => {
    const { getByTestId } = render(<Triangle color="yellow" data-testid="triangle" position="right" size={12} />);

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-bottom')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-left')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-top')).toBe('12px solid transparent');
  });

  it('should render a top-left triangle', () => {
    const { getByTestId } = render(<Triangle color="yellow" data-testid="triangle" position="top-left" size={12} />);

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-bottom')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-left')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-right')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-top')).toBe('12px solid yellow');
  });

  it('should render a top-right triangle', () => {
    const { getByTestId } = render(<Triangle color="yellow" data-testid="triangle" position="top-right" size={12} />);

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-bottom')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-left')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-right')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-top')).toBe('12px solid yellow');
  });

  it('should render a top triangle', () => {
    const { getByTestId } = render(<Triangle color="yellow" data-testid="triangle" position="top" size={12} />);

    const triangle = getByTestId('triangle');
    expect(triangle.style.getPropertyValue('border-bottom')).toBe('12px solid yellow');
    expect(triangle.style.getPropertyValue('border-left')).toBe('12px solid transparent');
    expect(triangle.style.getPropertyValue('border-right')).toBe('12px solid transparent');
  });

  it('should accept the rest of the props', () => {
    render(<Triangle color="blue" id="triangle" position="bottom" size={20} style={{ color: 'red' }} />);

    const triangle = document.getElementById('triangle');
    expect(triangle?.nodeName).toBe('DIV');
    expect(triangle?.style.getPropertyValue('color')).toBe('red');
  });
});
