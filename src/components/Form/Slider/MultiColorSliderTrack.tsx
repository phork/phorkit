import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { MergeElementPropsWithoutRef } from '../../../types';

export type LocalMultiColorSliderTrackProps = {
  children: React.ReactChild | React.ReactFragment;
  className: string;
  colors: readonly string[];
  sliderWidth?: number;
};

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

/**
 * The multi color slider track is the background track
 * and renders an SVG with all the inactive segments
 * and their colors.
 */
export const MultiColorSliderTrack = React.forwardRef(
  (
    { children, className, colors, sliderWidth = 0, ...props }: MultiColorSliderTrackProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ): React.ReactElement<MultiColorSliderTrackProps> => {
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
        className={className}
        ref={forwardedRef}
        sliderWidth={sliderWidth}
        trackBackground={trackBackground}
        {...props}
      >
        {children}
      </StyledTrack>
    );
  },
);

MultiColorSliderTrack.displayName = 'MultiColorSliderTrack';
