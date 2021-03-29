import get from 'lodash.get';
import React from 'react';
import { Theme } from '../../types';
import { ThemeContext } from './ThemeContext';

export interface WithThemeProps {
  themeId: Theme;
}

export function withTheme(WrappedComponent: React.ElementType): (props: WithThemeProps) => React.ReactElement {
  function ThemedComponent({ themeId, ...props }: WithThemeProps): React.ReactElement {
    return (
      <ThemeContext.Consumer>
        {value => <WrappedComponent themeId={themeId || get(value, 'themeId')} {...props} />}
      </ThemeContext.Consumer>
    );
  }

  return ThemedComponent;
}
