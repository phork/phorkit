import React from 'react';
import { Theme } from '../../types';
import { ThemeContext } from './ThemeContext';

export type WithThemeProps = {
  themeId?: Theme;
};

/**
 * A higher order component to provide the theme ID.
 */
export function withTheme<WrappedComponentProps extends Record<string, unknown>>(
  WrappedComponent: React.FC<WrappedComponentProps>,
): (props: WithThemeProps) => React.ReactElement {
  function ThemedComponent({ themeId, ...props }: WithThemeProps): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {value => (
          <WrappedComponent themeId={themeId || value?.themeId || 'light'} {...(props as WrappedComponentProps)} />
        )}
      </ThemeContext.Consumer>
    );
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ThemedComponent.displayName = `withTheme(${displayName})`;

  return ThemedComponent;
}
