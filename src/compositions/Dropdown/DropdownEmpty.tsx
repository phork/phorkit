import { cx } from '@emotion/css';
import React, { useMemo } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { substituteTranslationArgs, useTranslations } from '../../hooks/useTranslations';
import { RenderFromPropElement, renderFromPropWithFallback } from '../../utils/renderFromProp';
import styles from './styles/DropdownEmpty.module.css';
import { DropdownLayout } from './types';

type RenderFromPropProps = { filter?: string };

export type DropdownEmptyTranslations = {
  noFilteredOptions: string;
  noOptions: string;
};

export const dropdownEmptyTranslations: DropdownEmptyTranslations = {
  noFilteredOptions: 'No options are available for "{0}".',
  noOptions: 'No options are available.',
};

export interface DropdownEmptyProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children?: RenderFromPropElement<RenderFromPropProps>;
  filter?: string;
  layout?: DropdownLayout;
  translations?: DropdownEmptyTranslations;
}

/**
 * The empty dropdown notification is shown by the
 * DropdownContent component when there are no items
 * to show. It no children are provided it renders a
 * simple text message.
 */
export function DropdownEmpty({
  children,
  contrast = false,
  layout,
  filter,
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: DropdownEmptyProps): React.ReactElement<DropdownEmptyProps> | null {
  const themeId = useThemeId(initThemeId);
  const content = useMemo(
    () => (children ? renderFromPropWithFallback<RenderFromPropProps>(children, { filter }) : undefined),
    [children, filter],
  );

  const { noFilteredOptions, noOptions } = useTranslations<DropdownEmptyTranslations>({
    customTranslations,
    fallbackTranslations: dropdownEmptyTranslations,
  });

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
      {content || (filter ? substituteTranslationArgs(noFilteredOptions, filter) : noOptions)}
    </div>
  );
}

DropdownEmpty.displayName = 'DropdownEmpty';
