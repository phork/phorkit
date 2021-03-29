import { cx } from '@emotion/css';
import React, { useMemo } from 'react';
import { ThemeProps } from '../../types';
import { DropdownLayout } from './types';
import { useThemeId } from '../../hooks/useThemeId';
import { RenderFromPropElement, renderFromPropWithFallback } from '../../utils/renderFromProp';
import styles from './styles/DropdownEmpty.module.css';

export interface DropdownEmptyProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children?: RenderFromPropElement;
  filter?: string;
  layout?: DropdownLayout;
}

export function DropdownEmpty({
  children,
  contrast,
  layout,
  filter,
  themeId: initThemeId,
  ...props
}: DropdownEmptyProps): React.ReactElement<DropdownEmptyProps, 'div'> | null {
  const themeId = useThemeId(initThemeId);
  const content = useMemo(() => (children ? renderFromPropWithFallback(children, { filter }) : undefined), [
    children,
    filter,
  ]);

  const color = contrast ? 'contrast' : 'primary';

  if (content === '') {
    return null;
  }

  return (
    <div
      className={cx(
        styles.dropdownEmpty,
        color && styles[`dropdownEmpty--${color}`],
        themeId && styles[`dropdownEmpty--${themeId}`],
        layout && styles[`dropdownEmpty--${layout}`],
      )}
      {...props}
    >
      {content || (filter ? `No options are available for "${filter}".` : 'No options are available.')}
    </div>
  );
}
