import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Triangle, TooltipContent, TooltipContentProps } from 'lib';

jest.mock('lib/components/Triangle/Triangle', () => {
  return {
    Triangle: jest.fn(() => <div data-testid="triangle" />),
  };
});

describe('TooltipContent', () => {
  const defaultProps: TooltipContentProps = {
    children: 'Tooltip text',
    triangleColor: 'red',
  };

  it('renders the tooltip content', () => {
    render(<TooltipContent {...defaultProps} />);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('renders the triangle when triangleSize is provided', () => {
    render(<TooltipContent {...defaultProps} triangleSize={10} />);
    expect(screen.getAllByTestId('triangle')).toHaveLength(1);
  });

  it('renders the triangle border when triangleBorderColor is provided', () => {
    render(<TooltipContent {...defaultProps} triangleBorderColor="black" triangleSize={10} />);
    expect(screen.getAllByTestId('triangle')).toHaveLength(2); // one for the border, one for the triangle
  });

  it('does not render if position is null', () => {
    render(<TooltipContent {...defaultProps} position={null as never} />);
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('passes correct props to the Triangle component', () => {
    render(<TooltipContent {...defaultProps} position="top-left" triangleBorderColor="blue" triangleSize={12} />);
    expect(Triangle).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'blue',
        position: 'bottom',
        size: 12,
      }),
      expect.anything(),
    );
  });

  const positions = [
    { position: 'top-left', expected: 'bottom' },
    { position: 'top-center', expected: 'bottom' },
    { position: 'top-right', expected: 'bottom' },
    { position: 'bottom-left', expected: 'top' },
    { position: 'bottom-center', expected: 'top' },
    { position: 'bottom-right', expected: 'top' },
    { position: 'left-center', expected: 'right' },
    { position: 'right-center', expected: 'left' },
    { position: 'left-top', expected: 'right' },
    { position: 'left-bottom', expected: 'right' },
    { position: 'right-top', expected: 'left' },
    { position: 'right-bottom', expected: 'left' },
  ];

  positions.forEach(({ position, expected }) => {
    it(`passes correct props to the Triangle component for position ${position}`, () => {
      render(
        <TooltipContent {...defaultProps} position={position as never} triangleBorderColor="blue" triangleSize={12} />,
      );
      expect(Triangle).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'blue',
          position: expected,
          size: 12,
        }),
        expect.anything(),
      );
    });
  });
});
