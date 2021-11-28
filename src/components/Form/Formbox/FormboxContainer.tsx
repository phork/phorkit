import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, StateColor, MergeElementProps, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/Formbox.module.css';
import sizeStyles from './styles/FormboxSizes.module.css';
import { FormboxContainerElementType, FormboxInputElementType, FormboxSize, FormboxVariant } from './types';

export type LocalFormboxContainerProps = ThemeProps & {
  /** Whether the formbox input was auto-filled (see useAutoFilled hook) */
  autoFilled?: boolean;
  children: React.ReactChild | React.ReactFragment;
  centered?: boolean;
  className?: string;
  disabled?: boolean;
  /** This should be true if there's no input value, read only value, or placeholder */
  empty?: boolean;
  /** Manually apply the focus styles; this does not affect focus */
  focused?: boolean;
  hasIconAfter?: boolean;
  hasIconBefore?: boolean;
  id?: string;
  /** The width of the input container */
  inputWidth?: string | number;
  label?: React.ReactChild | React.ReactFragment | string;
  /** If the formbox container is read only then there are no hover events */
  readOnly?: boolean;
  size?: FormboxSize;
  style?: React.CSSProperties;
  /** A transitional input show the label as a placeholder which moves out of the way on focus or if there's a value */
  transitional?: boolean;
  /** Transparent inputs can be used inside styled containers (eg. a contained dropdown) */
  transparent?: boolean;
  type: FormboxInputElementType;
  validity?: StateColor;
  variant?: FormboxVariant;
  /** The width of the entire component */
  width?: string | number;
};

export type FormboxContainerProps<T extends FormboxContainerElementType> = AsReactType<T> &
  MergeElementProps<T, LocalFormboxContainerProps>;

/**
 * This applies all the container and label styles for
 * a form input container, and accepts the form input and
 * optional icons as its children, as well as a label.
 */
export function FormboxContainerBase<T extends FormboxContainerElementType>(
  {
    as,
    autoFilled = false,
    centered,
    children,
    className,
    contrast = false,
    disabled = false,
    empty: inputEmpty = false,
    focused = false,
    hasIconAfter = false,
    hasIconBefore = false,
    id,
    inputWidth,
    label,
    readOnly = false,
    size = 'large',
    style,
    themeId: initThemeId,
    transitional = false,
    transparent = false,
    type,
    unthemed = false,
    validity,
    variant = 'underline',
    width = '100%',
    ...props
  }: FormboxContainerProps<T>,
  forwardedRef: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : 'primary';
  const empty = inputEmpty && !autoFilled;

  const labeled = !!label;
  const isLabelPlaceholder = transitional && empty && !readOnly && !focused;

  return React.createElement(
    as || 'label',
    {
      className: cx(
        styles.formbox,
        sizeStyles[`formbox--${size}`],
        styles[`formbox--${type}`],
        color && !unthemed && styles[`formbox--${color}`],
        themeId && !unthemed && styles[`formbox--${themeId}`],
        transparent && styles['formbox--transparent'],
        variant && styles[`formbox--${variant}`],
        autoFilled && styles['is-autoFilled'],
        empty && styles['is-empty'],
        disabled && styles['is-disabled'],
        focused && styles['is-focused'],
        labeled && styles['is-labeled'],
        transitional && styles['is-transitional'],
        validity && styles[`is-${validity}`],
        className,
      ),
      htmlFor: as === 'label' ? id : undefined,
      ref: forwardedRef,
      style: { ...style, ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}) },
      // the tabIndex should be set on the input
      tabIndex: -1,
      ...props,
    },
    label && (
      <div
        className={cx(
          styles.formboxLabel,
          variant && styles[`formboxLabel--${variant}`],
          isLabelPlaceholder && styles['formboxLabel--placeholder'],
          isLabelPlaceholder && centered && styles['formboxLabel--centered'],
          hasIconBefore && styles['formboxLabel--hasIconBefore'],
          hasIconAfter && styles['formboxLabel--hasIconAfter'],
          autoFilled && styles['is-autoFilled'],
        )}
      >
        {label}
      </div>
    ),
    <div
      className={cx(
        styles.formboxInputContainer,
        variant && styles[`formboxInputContainer--${variant}`],
        readOnly && styles['formboxInputContainer--readOnly'],
        autoFilled && styles['is-autoFilled'],
        focused && styles['is-focused'],
      )}
      style={{ width: typeof inputWidth === 'number' ? `${inputWidth}px` : inputWidth }}
    >
      {children}
    </div>,
  );
}

export const FormboxContainer = React.forwardRef(FormboxContainerBase) as <T extends FormboxContainerElementType>(
  p: FormboxContainerProps<T> & { ref?: React.Ref<HTMLElementTagNameMap[T]> },
) => React.ReactElement<T>;

// note that the base element cannot have a displayName because it breaks Storybook
(FormboxContainer as React.NamedExoticComponent).displayName = 'FormboxContainer';
