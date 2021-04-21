import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { textToClipboard } from 'utils/clipboard';
import { ClipboardIcon } from 'icons/internal/ClipboardIcon';
import { Flex, FlexProps } from 'components/Flex';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { StyledIconToast, ToastContext } from 'compositions/Toast';

const SwatchBlock = styled.div<{
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

  > svg {
    pointer-events: none;
  }
`;

const SwatchLabel = styled.div<{
  height?: string | number;
  width?: string | number;
}>`
  align-items: center;
  display: flex;
  font-size: 11px;
  height: ${props => `${props.height}${typeof props.height === 'number' ? 'px' : ''}`};
  justify-content: center;
  position: relative;
  width: ${props => `${props.width}${typeof props.width === 'number' ? 'px' : ''}`}; ;
`;

export type Color = {
  id: string;
  color: string;
  contrast?: string;
  height?: string | number;
  width?: string | number;
  children?: React.ReactNode;
};

export interface ColorSwatchGroupProps {
  children?: React.ReactNode;
  colors: Color[];
  direction?: FlexProps['direction'];
  joined?: boolean;
  label?: string;
  labelHeight?: string | number;
  labelWidth?: string | number;
  swatchHeight?: string | number;
  swatchWidth?: string | number;
  withIcon?: boolean;
}

export function ColorSwatchGroup({
  children,
  colors,
  direction = 'row',
  joined,
  label,
  labelHeight,
  labelWidth,
  swatchHeight = 60,
  swatchWidth = 40,
  ...props
}: ColorSwatchGroupProps): React.ReactElement {
  const { createNotification } = useContext(ToastContext);

  const handleClick = (id: string, color: string, contrast?: string) => {
    try {
      textToClipboard(id);
      createNotification(
        <StyledIconToast
          title="Copied to clipboard"
          icon={ClipboardIcon}
          levelColor={color}
          levelInverseColor={contrast}
          variant="colored"
        >
          <div>
            The color ID <strong>{id}</strong> has been copied to your clipboard.
          </div>
          <Rhythm mt={2}>
            <Typography as="div" weight="bold" volume="quieter">
              {color}
            </Typography>
          </Rhythm>
        </StyledIconToast>,
      );
    } catch (e) {
      // do nothing here
    }
  };

  return (
    <Flex direction={direction} wrap {...props}>
      {label && (
        <Rhythm m={joined ? 0 : 1}>
          <SwatchLabel width={labelWidth || swatchWidth} height={labelHeight || swatchHeight}>
            {label}
          </SwatchLabel>
        </Rhythm>
      )}

      {colors.map(({ color, contrast, id, width, height, children: colorChildren }) => (
        <Rhythm key={id} m={joined ? 0 : 1}>
          <SwatchBlock
            backgroundColor={color}
            color={contrast}
            rounded={!joined}
            title={`${id} ${color}`}
            width={width || swatchWidth}
            height={height || swatchHeight}
            onClick={() => handleClick(id, color, contrast)}
          >
            {colorChildren !== undefined ? colorChildren : children}
          </SwatchBlock>
        </Rhythm>
      ))}
    </Flex>
  );
}

ColorSwatchGroup.displayName = 'ColorSwatchGroup';
