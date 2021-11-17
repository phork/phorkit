import styled from '@emotion/styled';
import React from 'react';
import { Color, ColorSwatchVector, ColorSwatchVectorProps } from './ColorSwatchVector';

const GridContainer = styled('div', {
  shouldForwardProp: (prop: string) => !['joined', 'direction'].includes(prop),
})<{ direction: 'row' | 'column'; joined?: boolean }>`
  display: inline-flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
`;

type ColorGridVector = {
  colors: readonly Color[];
  label?: string;
  id: string;
};

export type ColorSwatchGridProps = Omit<ColorSwatchVectorProps, 'colors' | 'label'> & {
  colorGrid: readonly ColorGridVector[];
};

export function ColorSwatchGrid({
  colorGrid,
  direction = 'column',
  joined,
  labelWidth: initLabelWidth,
  labelHeight: initLabelHeight,
  ...props
}: ColorSwatchGridProps): JSX.Element | null {
  const gridDirection = direction === 'column' ? 'row' : 'column';
  const labelHeight = initLabelHeight || props.swatchHeight;
  const labelWidth = initLabelWidth || props.swatchWidth;

  return (
    <GridContainer direction={gridDirection} joined={joined}>
      {colorGrid.map(({ colors, label, id }) => (
        <ColorSwatchVector
          colors={colors}
          direction={direction}
          joined={joined}
          key={id}
          label={label}
          labelHeight={labelHeight}
          labelWidth={labelWidth}
          {...props}
        />
      ))}
    </GridContainer>
  );
}

ColorSwatchGrid.displayName = 'ColorSwatchGrid';
