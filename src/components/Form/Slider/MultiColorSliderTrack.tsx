import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { MergeElementPropsWithoutRef } from '../../../types';

export interface LocalMultiColorSliderTrackProps {
  children: React.ReactNode;
  className: string;
  colors: string[];
  sliderWidth?: number;
}

export type MultiColorSliderTrackProps = MergeElementPropsWithoutRef<'div', LocalMultiColorSliderTrackProps>;

const StyledTrack = styled('div', {
  shouldForwardProp: (prop: string) => !['trackBackground', 'sliderWidth'].includes(prop),
})<Omit<MultiColorSliderTrackProps, 'colors'> & { trackBackground: string }>`
  ${({ trackBackground, sliderWidth }) => `
    &:before {
      background: ${trackBackground};
      background-size: ${sliderWidth}px;
      opacity: 0.2;
    }

    &:after {
      background: ${trackBackground};
      background-size: ${sliderWidth}px;
    }
  `}
`;

export const MultiColorSliderTrack = React.forwardRef(
  (
    { children, className, colors, sliderWidth = 0, ...props }: MultiColorSliderTrackProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ): React.ReactElement<MultiColorSliderTrackProps, 'div'> => {
    const backgroundSvgWidth = 72;

    const trackBackground = useMemo(() => {
      return `url('
        data:image/svg+xml;
        utf8,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${backgroundSvgWidth} ${backgroundSvgWidth}" height="100%" width="100%">
          ${colors
            .map(
              (color, i) =>
                `<rect
                  x="${(backgroundSvgWidth / colors.length) * i}"
                  y="0"
                  width="${backgroundSvgWidth / colors.length}"
                  height="100%"
                  fill="${color.replace('#', '%23')}"
                />`,
            )
            .join('')}
        </svg>
      ')`.replace(/(?:\r\n|\r|\n)/g, ' ');
    }, [colors]);

    return (
      <StyledTrack
        ref={forwardedRef}
        trackBackground={trackBackground}
        sliderWidth={sliderWidth}
        className={className}
        {...props}
      >
        {children}
      </StyledTrack>
    );
  },
);

MultiColorSliderTrack.displayName = 'MultiColorSliderTrack';
