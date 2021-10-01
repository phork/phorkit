import React from 'react';
import { Theme } from '../../types';
import { ThemeContext } from './ThemeContext';

export type WithThemeProps = {
  themeId: Theme;
};

/**
 * A higher order component to provide the theme ID.
 */
export function withTheme<WrappedComponentProps extends {} = {}>(
  WrappedComponent: React.FC<{ themeId: Theme } & WrappedComponentProps>,
): (props: WithThemeProps) => React.ReactElement {
  function ThemedComponent({ themeId, ...props }: WithThemeProps): React.ReactElement {
    return (
      <ThemeContext.Consumer>
        {value => <WrappedComponent themeId={themeId || value?.themeId} {...(props as WrappedComponentProps)} />}
      </ThemeContext.Consumer>
    );
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ThemedComponent.displayName = `withTheme(${displayName})`;

  return ThemedComponent;
}
