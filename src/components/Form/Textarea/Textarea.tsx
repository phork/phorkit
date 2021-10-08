import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { FormboxInput, FormboxReadOnly, Formbox, FormboxProps, FormboxValue, useAutoFilled } from '../Formbox';
import styles from './styles/Textarea.module.css';

export type LocalTextareaProps = Pick<
  FormboxProps,
  | 'alwaysTriggerBlur'
  | 'alwaysTriggerFocus'
  | 'className'
  | 'contrast'
  | 'disabled'
  | 'iconAfter'
  | 'iconAfterActionable'
  | 'iconAfterClassName'
  | 'iconBefore'
  | 'iconBeforeActionable'
  | 'iconBeforeClassName'
  | 'id'
  | 'inputWidth'
  | 'label'
  | 'onBlur'
  | 'onFocus'
  | 'persistEvents'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'style'
  | 'themeId'
  | 'transitional'
  | 'translations'
  | 'transparent'
  | 'unthemed'
  | 'validity'
  | 'visuallyFocused'
  | 'width'
> & {
  cols?: number;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  maxLength?: number;
  name?: string;
  onAnimationStart?: React.AnimationEventHandler<HTMLTextAreaElement>;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>, value: FormboxValue) => void;
  onInputBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onInputFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value?: FormboxValue;
  variant?: Exclude<FormboxProps['variant'], 'pill'>;
};

export type TextareaProps = MergeProps<
  Omit<React.ComponentPropsWithoutRef<'textarea'>, 'className' | 'size' | 'style' | 'width'>,
  LocalTextareaProps
> & {
  formboxProps?: Omit<Omit<FormboxProps, 'autoFilled'>, keyof LocalTextareaProps>;
};

export type TextareaRef = React.ForwardedRef<HTMLTextAreaElement>;

export function TextareaBase(
  {
    alwaysTriggerBlur,
    alwaysTriggerFocus,
    className,
    cols,
    contrast = false,
    disabled = false,
    formboxProps,
    iconAfter,
    iconAfterActionable,
    iconAfterClassName,
    iconBefore,
    iconBeforeActionable,
    iconBeforeClassName,
    id,
    inputClassName,
    inputStyle,
    inputWidth,
    label,
    maxLength,
    name,
    onAnimationStart,
    onBlur,
    onChange,
    onFocus,
    onInputBlur,
    onInputFocus,
    persistEvents,
    placeholder,
    readOnly = false,
    required = false,
    rows = 3,
    size,
    style,
    themeId: initThemeId,
    transitional = false,
    translations,
    transparent,
    unthemed,
    validity,
    value = '',
    variant,
    visuallyFocused,
    width,
    ...props
  }: TextareaProps,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const themeId = useThemeId(initThemeId);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const combineRefs = makeCombineRefs<HTMLTextAreaElement>(inputRef, forwardedRef);

  const { autoFilled, handleAnimationStart } = useAutoFilled<HTMLTextAreaElement>({ onAnimationStart });

  const handleChange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
    event => {
      if (value !== event.target.value) {
        if (!maxLength || !event.target.value || event.target.value.length <= maxLength) {
          onChange && onChange(event, event.target.value);
        }
      }
    },
    [maxLength, onChange, value],
  );

  // an input is considered empty if there is nothing to show in the input (eg. value or placeholder)
  const hasValue = value !== undefined && value !== '';
  const isEmpty = !hasValue && placeholder === undefined;

  return (
    <Formbox
      alwaysTriggerBlur={alwaysTriggerBlur}
      alwaysTriggerFocus={alwaysTriggerFocus}
      autoFilled={autoFilled}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={isEmpty}
      iconAfter={iconAfter}
      iconAfterActionable={iconAfterActionable}
      iconAfterClassName={cx(styles.textareaIcon, styles[`textareaIcon--${variant}`], iconAfterClassName)}
      iconBefore={iconBefore}
      iconBeforeActionable={iconBeforeActionable}
      iconBeforeClassName={iconBeforeClassName}
      id={id}
      inputWidth={inputWidth}
      label={label}
      onBlur={onBlur}
      onFocus={onFocus}
      persistEvents={persistEvents}
      readOnly={readOnly}
      required={required}
      size={size}
      style={style}
      themeId={themeId}
      transitional={transitional}
      translations={translations}
      transparent={transparent}
      type="textarea"
      unthemed={unthemed}
      validity={validity}
      variant={variant}
      visuallyFocused={visuallyFocused}
      width={width}
      {...formboxProps}
    >
      {({ id, variant }) =>
        readOnly ? (
          <FormboxReadOnly contrast={contrast} id={id} value={value} />
        ) : (
          <FormboxInput<'textarea'> contrast={contrast} placeholder={placeholder} themeId={themeId} variant={variant}>
            <textarea
              className={inputClassName}
              cols={cols}
              disabled={disabled}
              id={id}
              name={name}
              onAnimationStart={handleAnimationStart}
              onBlur={onInputBlur}
              onChange={handleChange}
              onFocus={onInputFocus}
              ref={combineRefs}
              rows={rows}
              style={inputStyle}
              value={value}
              {...props}
            />
          </FormboxInput>
        )
      }
    </Formbox>
  );
}

/**
 * The textarea component extends the `Formbox` component and
 * contains both a textarea form input and a label. It accepts
 * custom icons, a placeholder value, a read only state (in
 * addition to a disabled state) and several custom style options.
 *
 * The value state should be stored outside of this component
 * and is updated by the `onChange` callback.
 */
export const Textarea = React.forwardRef(TextareaBase);

// note that the base element cannot have a displayName because it breaks Storybook
Textarea.displayName = 'Textarea';
