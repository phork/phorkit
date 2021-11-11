import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import { themes } from 'config/themes';

const themeId = 'light';

const OuterBox = styled.div`
  background-color: ${props => props.backgroundColor};
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
`;

const InnerBox = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: inline-block;
  text-align: center;

  ${props => props.height && `height: ${props.height}px`};
  ${props => props.height && `line-height: ${props.height}px`};
  ${props => props.width && `width: ${props.width}px`};
`;

export function RhythmBox({ inline, children, ...props }) {
  return (
    <OuterBox backgroundColor={themes[themeId]['color-accent-L10']} inline={inline}>
      <InnerBox
        backgroundColor={themes[themeId]['color-accent']}
        color={themes[themeId]['color-accent-contrast']}
        {...props}
      >
        {children}
      </InnerBox>
    </OuterBox>
  );
}

RhythmBox.defaultProps = {
  inline: false,
  children: undefined,
};

RhythmBox.propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.node,
};
