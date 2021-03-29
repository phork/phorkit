import { cx } from '@emotion/css';
import React, { useRef } from 'react';
import { InvalidStateColor, MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useComponentId } from '../../../hooks/useComponentId';
import { useDeepFocus } from '../../../hooks/useDeepFocus';
import { useThemeId } from '../../../hooks/useThemeId';
import { useTranslations } from '../../../hooks/useTranslations';
import { renderFromProp, RenderFromPropElement } from '../../../utils/renderFromProp';
import { PencilSlashIcon } from '../../../icons/PencilSlashIcon';
import styles from './styles/Formbox.module.css';

export type FormboxTranslations = {
  readOnlyLabel: string;
};

export const formboxTranslations: FormboxTranslations = {
  readOnlyLabel: 'Read only',
};

export type FormboxValue = string | number;
export type FormboxContainerElementType = Extract<keyof JSX.IntrinsicElements, 'label' | 'div'>;
export type FormboxInputElementType = Extract<keyof JSX.IntrinsicElements, 'input' | 'select' | 'textarea'>;
export type FormboxVariant = 'underline' | 'filled' | 'outline' | 'minimal';
export type FormboxIconPosition = 'before' | 'after';

export interface LocalFormboxProps<I extends FormboxInputElementType> extends ThemeProps {
  alwaysTriggerBlur?: boolean;
  alwaysTriggerFocus?: boolean;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  empty?: boolean;
  iconAfter?: RenderFromPropElement;
  iconAfterActionable?: boolean;
  iconBefore?: RenderFromPropElement;
  iconBeforeActionable?: boolean;
  id?: string;
  input: React.ReactElement<HTMLElementTagNameMap[I]>;
  inputWidth?: number | string;
  label?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<Element>) => void;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: string,
  ) => void;
  onFocus?: (event: React.FocusEvent<Element>) => void;
  onIconBlur?: (event: React.FocusEvent, position: FormboxIconPosition) => void;
  onIconFocus?: (event: React.FocusEvent, position: FormboxIconPosition) => void;
  persistEvents?: boolean;
  placeholder?: React.ReactChild;
  readOnly?: boolean;
  /** readOnlyValue can be used to show HTML; if undefined it will default to the regular value */
  readOnlyValue?: React.ReactChild;
  /** silentReadOnly cannot be edited but has all the functionality of a regular input (focus, blur, etc.) */
  silentReadOnly?: boolean;
  tabIndex?: number;
  transitional?: boolean;
  translations?: FormboxTranslations;
  /** transparent inputs can be used inside styled containers (eg. a contained dropdown) */
  transparent?: boolean;
  validity?: InvalidStateColor;
  value?: FormboxValue | FormboxValue[];
  variant?: FormboxVariant;
  width?: string | number;
}

// because the forwardedRef goes on the input, we need to MergeElementPropsWithoutRef and then add a separate input ref
export type FormboxProps<T extends FormboxContainerElementType, I extends FormboxInputElementType> = {
  as?: T;
  ref?: React.Ref<HTMLElement>;
  type?: I;
} & MergeElementPropsWithoutRef<T, LocalFormboxProps<I>>;

function FormboxBase<T extends FormboxContainerElementType, I extends FormboxInputElementType>(
  {
    alwaysTriggerBlur,
    alwaysTriggerFocus,
    as,
    autoFocus,
    className,
    contrast,
    disabled,
    empty,
    iconAfter,
    iconAfterActionable,
    iconBefore,
    iconBeforeActionable,
    id,
    input,
    inputWidth,
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    onIconBlur,
    onIconFocus,
    persistEvents,
    placeholder,
    readOnly,
    readOnlyValue,
    silentReadOnly,
    tabIndex,
    themeId: initThemeId,
    transitional,
    translations: customTranslations,
    transparent,
    type,
    validity,
    value,
    variant = 'underline',
    width = '100%',
    ...props
  }: FormboxProps<T, I>,
  forwardedRef: React.ForwardedRef<HTMLElement>,
): React.ReactElement {
  const ref = useRef<HTMLElementTagNameMap[T] | null>(null);
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : 'primary';
  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLElementTagNameMap[T]>(
    ref,
    { onBlur, onFocus },
    { alwaysTriggerBlur, alwaysTriggerFocus, persistEvents },
  );
  const { generateComponentId } = useComponentId(id);
  const translations = useTranslations({ customTranslations, fallbackTranslations: formboxTranslations });
  const { readOnlyLabel } = translations;

  const handleChange: React.ChangeEventHandler<HTMLElementTagNameMap[I]> = event => {
    persistEvents && 'persist' in event && event.persist();
    if (value !== event.target.value) {
      onChange && onChange(event, event.target.value);
    }
  };

  const renderInput = (): React.ReactElement | null => {
    return React.isValidElement(input)
      ? React.cloneElement(input as React.ReactElement, {
          autoFocus,
          className: cx(input.props.className, styles.formboxInput, variant && styles[`formboxInput--${variant}`]),
          disabled,
          ref: forwardedRef,
          id: generateComponentId(),
          name,
          onChange: handleChange,
          tabIndex,
          value,
        })
      : null;
  };

  const renderReadOnly = () => (
    <div
      className={styles.formboxReadOnly}
      {...(silentReadOnly && {
        ref: forwardedRef as React.ForwardedRef<HTMLDivElement>,
        tabIndex,
      })}
    >
      {readOnlyValue ||
        (Array.isArray(value) ? (
          <div className={cx(styles.formboxReadOnlyList)}>
            {value.map((value: number | string) => (
              <div key={value}>{value}</div>
            ))}
          </div>
        ) : (
          value
        )) ||
        placeholder}
      &nbsp;
    </div>
  );

  // the best practice is to pass a button for the icon if it's actionable
  const renderIcon = (icon: RenderFromPropElement, position: FormboxIconPosition, actionable: boolean | undefined) => {
    const autoSize = !(typeof icon === 'object' && icon.props && (icon.props.size || icon.props.scale));
    const className = cx(
      styles.formboxIcon,
      actionable && styles['formboxIcon--actionable'],
      autoSize && styles['formboxIcon--autoSize'],
      position && styles[`formboxIcon--${position}`],
      variant && styles[`formboxIcon--${variant}`],
      typeof icon === 'object' && icon.props && icon.props.className,
    );

    return renderFromProp(icon, {
      className,
      onBlur: actionable ? (event: React.FocusEvent) => onIconBlur && onIconBlur(event, position) : undefined,
      onFocus: actionable ? (event: React.FocusEvent) => onIconFocus && onIconFocus(event, position) : undefined,
    });
  };

  const renderIconAfter = () => iconAfter && renderIcon(iconAfter, 'after', iconAfterActionable);
  const renderIconBefore = () => iconBefore && renderIcon(iconBefore, 'before', iconBeforeActionable);

  return React.createElement(
    as || 'label',
    {
      className: cx(
        styles.formbox,
        styles[`formbox--${type}`],
        color && styles[`formbox--${color}`],
        themeId && styles[`formbox--${themeId}`],
        transparent && styles['formbox--transparent'],
        variant && styles[`formbox--${variant}`],
        empty && styles['is-empty'],
        disabled && styles['is-disabled'],
        !!label && styles['is-labeled'],
        (focused || autoFocus) && styles['is-focused'],
        validity && styles[`is-${validity}`],
        className,
      ),
      htmlFor: as === 'label' ? generateComponentId() : undefined,
      onBlur: handleBlur,
      onFocus: handleFocus,
      ref,
      style: width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : undefined,
      ...props,
    },
    label && (
      <div
        className={cx(
          styles.formboxLabel,
          variant && styles[`formboxLabel--${variant}`],
          transitional &&
            empty &&
            (!focused || type === 'select') &&
            !placeholder &&
            !(readOnly && readOnlyValue) &&
            styles['formboxLabel--placeholder'],
          iconBefore && styles['formboxLabel--hasIconBefore'],
          iconAfter && styles['formboxLabel--hasIconAfter'],
        )}
      >
        {label}
      </div>
    ),
    <div
      className={cx(
        styles.formboxInputContainer,
        variant && styles[`formboxInputContainer--${variant}`],
        readOnly && !silentReadOnly && styles['formboxInputContainer--readOnly'],
        (focused || autoFocus) && styles['is-focused'],
      )}
      style={{ width: typeof inputWidth === 'number' ? `${inputWidth}px` : inputWidth }}
    >
      {renderIconBefore()}
      {readOnly ? renderReadOnly() : renderInput()}
      {readOnly && !silentReadOnly && (
        <PencilSlashIcon
          scale="small"
          className={cx(styles.formboxIcon, variant && styles[`formboxIcon--${variant}`], styles['formboxIcon--after'])}
          title={readOnlyLabel}
        />
      )}
      {renderIconAfter()}
    </div>,
  );
}

export const Formbox = React.forwardRef(FormboxBase) as typeof FormboxBase;
