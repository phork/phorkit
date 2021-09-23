import { cx } from '@emotion/css';
import React, { useMemo } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { RenderFromPropElement, renderFromPropWithFallback } from '../../utils/renderFromProp';
import styles from './styles/DropdownEmpty.module.css';
import { DropdownLayout } from './types';

type RenderFromPropProps = { filter?: string };

export interface DropdownEmptyProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children?: RenderFromPropElement<RenderFromPropProps>;
  filter?: string;
  layout?: DropdownLayout;
}

export function DropdownEmpty({
  children,
  contrast = false,
  layout,
  filter,
  themeId: initThemeId,
  ...props
}: DropdownEmptyProps): React.ReactElement<DropdownEmptyProps> | null {
  const themeId = useThemeId(initThemeId);
  const content = useMemo(
    () => (children ? renderFromPropWithFallback<RenderFromPropProps>(children, { filter }) : undefined),
    [children, filter],
  );

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

DropdownEmpty.displayName = 'DropdownEmpty';
