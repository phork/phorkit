import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { textToClipboard } from 'utils/clipboard';
import { ClipboardIcon } from 'icons/internal/ClipboardIcon';
import { Flex, FlexProps } from 'components/Flex';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { StyledIconToast, ToastContext } from 'compositions/Toast';

const SwatchGroup = styled(Flex, {
  shouldForwardProp: (prop: string) => prop !== 'joined',
})<{
  direction: FlexProps['direction'];
  joined?: boolean;
}>`
  ${({ direction = 'row', joined = false }) =>
    joined &&
    `
    div:first-of-type {
      border-${direction === 'column' ? 'top-left' : 'bottom-left'}-radius: 3px;
      border-${direction === 'column' ? 'top-right' : 'top-left'}-radius: 3px;
    }

    div:last-of-type {
      border-${direction === 'column' ? 'bottom-left' : 'bottom-right'}-radius: 3px;
      border-${direction === 'column' ? 'bottom-right' : 'top-right'}-radius: 3px;
    }
`}
`;

const SwatchBlock = styled('div', {
  shouldForwardProp: (prop: string) =>
    !['backgroundColor', 'color', 'height', 'joined', 'rounded', 'width'].includes(prop),
})<{
  backgroundColor: string;
  color?: string;
  height?: string | number;
  rounded?: boolean;
  width?: string | number;
}>`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => (props.rounded ? '4px' : '0')};
  color: ${props => props.color || 'currentColor'};
  cursor: pointer;
  display: flex;
  flex: none;
  font-size: 11px;
  height: ${props => `${props.height}${typeof props.height === 'number' ? 'px' : ''}`};
  justify-content: center;
  position: relative;
  width: ${props => `${props.width}${typeof props.width === 'number' ? 'px' : ''}`};

  &:before {
    border-radius: 4px;
    bottom: 0;
    box-shadow: 0 0 0 0 transparent;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: box-shadow 100ms;
  }

  &:hover,
  &:focus {
    outline: none;
    z-index: 1;

    &:before {
      box-shadow: 0 0 0 3px ${props => props.backgroundColor};
    }
  }

  > svg {
    pointer-events: none;
  }
`;

// this is a p rather than a div so div:first-of-type can still be used for radii
const SwatchLabel = styled('p', {
  shouldForwardProp: (prop: string) => !['direction', 'height', 'width'].includes(prop),
})<{
  direction?: FlexProps['direction'];
  height?: string | number;
  width?: string | number;
}>`
  align-self: ${({ direction }) => (direction === 'row' ? 'center' : 'flex-start')};
  display: flex;
  font-size: 11px;
  height: ${props => `${props.height}${typeof props.height === 'number' ? 'px' : ''}`};
  justify-content: ${({ direction }) => (direction === 'column' ? 'center' : 'flex-start')};
  position: relative;
  width: ${props => `${props.width}${typeof props.width === 'number' ? 'px' : ''}`}; ;
`;

export type Color = {
  id: string;
  color: string;
  contrast?: string;
  height?: string | number;
  width?: string | number;
  children?: React.ReactChild | React.ReactFragment | null;
};

export type ColorSwatchVectorProps = {
  children?: React.ReactChild | React.ReactFragment | null;
  colors: readonly Color[];
  direction?: FlexProps['direction'];
  joined?: boolean;
  label?: string;
  labelHeight?: string | number;
  labelWidth?: string | number;
  swatchHeight?: string | number;
  swatchWidth?: string | number;
  withIcon?: boolean;
};

export const ColorSwatchVector = React.memo(function ColorSwatchVector({
  children,
  colors,
  direction = 'row',
  joined = false,
  label,
  labelHeight,
  labelWidth,
  swatchHeight = 60,
  swatchWidth = 40,
  ...props
}: ColorSwatchVectorProps): JSX.Element {
  const { createNotification } = useContext(ToastContext);

  const handleClick = (id: string, color: string, contrast?: string) => {
    try {
      textToClipboard(id);
      createNotification(
        <StyledIconToast
          icon={ClipboardIcon}
          levelColor={color}
          levelInverseColor={contrast || 'currentColor'}
          title="Copied to clipboard"
          variant="colored"
        >
          <div>
            The color ID <strong>{id}</strong> has been copied to your clipboard.
          </div>
          <Rhythm mt={2}>
            <Typography as="div" volume="quieter" weight="bold">
              {color}
            </Typography>
          </Rhythm>
        </StyledIconToast>,
      );
    } catch (e) {
      // do nothing here
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: string, color: string, contrast?: string) => {
    if (event.key === 'Enter') {
      handleClick(id, color, contrast);
    }
  };

  return (
    <SwatchGroup inline joined wrap direction={direction} {...props}>
      {label && (
        <Rhythm m={joined ? 0 : 1}>
          <SwatchLabel direction={direction} height={labelHeight} width={labelWidth}>
            {label}
          </SwatchLabel>
        </Rhythm>
      )}

      {colors.map(({ color, contrast, id, width, height, children: colorChildren }: Color) => (
        <Rhythm key={id} m={joined ? 0 : 1}>
          <SwatchBlock
            backgroundColor={color}
            color={contrast}
            height={height || swatchHeight}
            onClick={() => handleClick(id, color, contrast)}
            onKeyDown={event => handleKeyDown(event, id, color, contrast)}
            rounded={!joined}
            tabIndex={0}
            title={`${id} ${color}`}
            width={width || swatchWidth}
          >
            {colorChildren !== undefined ? colorChildren : children}
          </SwatchBlock>
        </Rhythm>
      ))}
    </SwatchGroup>
  );
});

ColorSwatchVector.displayName = 'ColorSwatchVector';
