import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import { themes } from 'config/themes';
import { themeIdPropType } from './propTypes';

const Theme = styled.div`
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  color: ${props => props.color};
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px 0 40px;
  justify-content: center;
  position: relative;
  width: 100%;

  &:before {
    background-color: ${props => props.borderColor};
    bottom: 20px;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  &:after {
    background-color: ${props => props.borderColor};
    bottom: 0;
    content: '';
    position: absolute;
    right: 20px;
    top: 0;
    width: 1px;
  }

  > .quiet {
    color: ${props => props.quietColor};
  }

  > .quieter {
    color: ${props => props.quieterColor};
  }

  > .quietest {
    color: ${props => props.quietestColor};
  }

  > .accent {
    color: ${props => props.accentColor};
  }
`;

export function ColorTheme({ themeId, variant }) {
  const themeProps = themes[themeId];

  return (
    <Theme
      color={themeProps[`${variant}-text-color`]}
      backgroundColor={themeProps[`${variant}-background-color`]}
      borderColor={themeProps[`${variant}-border-color`]}
      quietColor={themeProps[`${variant}-quiet-color`]}
      quieterColor={themeProps[`${variant}-quieter-color`]}
      quietestColor={themeProps[`${variant}-quietest-color`]}
      accentColor={themeProps[`${variant}-accent-color`]}
    >
      <div>The quick brown fox jumped over the lazy dog</div>
      <div className="quiet">The quiet brown fox jumped over the lazy dog</div>
      <div className="quieter">The quieter brown fox jumped over the lazy dog</div>
      <div className="quietest">The quietest brown fox jumped over the lazy dog</div>
      <div className="accent">The accented brown fox jumped over the lazy dog</div>
    </Theme>
  );
}

ColorTheme.defaultProps = {
  themeId: undefined,
};

ColorTheme.propTypes = {
  themeId: themeIdPropType,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'contrast']).isRequired,
};
