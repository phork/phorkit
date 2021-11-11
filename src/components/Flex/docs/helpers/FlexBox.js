import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import { themes } from 'config/themes';

const themeId = 'light';

const Box = styled('div', {
  shouldForwardProp: prop => !['backgroundColor', 'borderColor', 'color', 'width', 'height'].includes(prop),
})`
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  color: ${props => props.color};
  height: ${props => `${props.height}px`};
  line-height: ${props => `${props.height}px`};
  text-align: center;
  width: ${props => `${props.width}${typeof props.width === 'number' ? 'px' : ''}`};
`;

export function FlexBox({ children, height, width, ...props }) {
  return (
    <Box
      backgroundColor={themes[themeId]['color-accent']}
      borderColor={themes[themeId]['color-accent-contrast']}
      color={themes[themeId]['color-accent-contrast']}
      height={height}
      width={width}
      {...props}
    >
      {children}
    </Box>
  );
}

FlexBox.defaultProps = {
  children: undefined,
  height: undefined,
  width: undefined,
};

FlexBox.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
