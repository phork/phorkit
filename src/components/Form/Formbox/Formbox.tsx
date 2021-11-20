import React, { useRef } from 'react';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { useDeepFocus } from '../../../hooks/useDeepFocus';
import { useTranslations } from '../../../hooks/useTranslations';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { RenderFromPropElement } from '../../../utils/renderFromProp';
import { PencilSlashIcon } from '../../../icons/PencilSlashIcon';
import { FormboxContainer, FormboxContainerProps } from './FormboxContainer';
import { FormboxIcon, FormboxIconRenderProps } from './FormboxIcon';
import { FormboxSize, FormboxVariant } from './types';

export type FormboxTranslations = {
  readOnlyLabel: string;
};

export const formboxTranslations: FormboxTranslations = {
  readOnlyLabel: 'Read only',
};

export type FormboxRenderInput = (props: {
  focused?: boolean;
  id: string;
  required?: boolean;
  variant: FormboxVariant;
}) => React.ReactElement<HTMLElement>;

export type FormboxProps = Omit<FormboxContainerProps<'label'>, 'as' | 'children' | 'id'> & {
  /** alwaysTriggerFocus means the a focus transfer within the formbox will trigger the blur event */
  alwaysTriggerBlur?: boolean;
  /** alwaysTriggerFocus means the a focus transfer within the formbox will trigger the focus event */
  alwaysTriggerFocus?: boolean;
  /** Whether the formbox input was auto-filled (see useAutoFilled hook) */
  autoFilled?: boolean;
  /** Center the value or the placeholder when it's used as a value */
  centered?: boolean;
  children: FormboxRenderInput;
  iconAfter?: RenderFromPropElement<FormboxIconRenderProps>;
  /** The best practice is to pass a button if the icon is actionable */
  iconAfterActionable?: boolean;
  iconAfterClassName?: string;
  iconBefore?: RenderFromPropElement<FormboxIconRenderProps>;
  /** The best practice is to pass a button if the icon is actionable */
  iconBeforeActionable?: boolean;
  iconBeforeClassName?: string;
  id?: string;
  onBlur?: (event: React.FocusEvent<Element>) => void;
  onFocus?: (event: React.FocusEvent<Element>) => void;
  persistEvents?: boolean;
  required?: boolean;
  size?: FormboxSize;
  translations?: Partial<FormboxTranslations>;
  /** Manually apply the focus styles; this does not affect focus */
  visuallyFocused?: boolean;
};

export function FormboxBase(
  {
    alwaysTriggerBlur = false,
    alwaysTriggerFocus = false,
    autoFilled = false,
    centered,
    children: renderInput,
    className,
    contrast = false,
    disabled = false,
    empty = false,
    iconAfter,
    iconAfterActionable = false,
    iconAfterClassName,
    iconBefore,
    iconBeforeActionable = false,
    iconBeforeClassName,
    id,
    inputWidth,
    label,
    onBlur,
    onFocus,
    persistEvents = false,
    readOnly = false,
    required = false,
    size = 'large',
    style,
    themeId: initThemeId,
    transitional = false,
    translations: customTranslations,
    transparent = false,
    type,
    unthemed = false,
    validity,
    variant = 'underline',
    visuallyFocused = false,
    width = '100%',
    ...props
  }: FormboxProps,
  forwardedRef: React.ForwardedRef<HTMLLabelElement>,
): React.ReactElement {
  const ref = useRef<HTMLLabelElement | null>(null);
  const themeId = useThemeId(initThemeId);
  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLLabelElement>(
    ref,
    { onBlur, onFocus },
    { alwaysTriggerBlur, alwaysTriggerFocus, persistEvents },
  );
  const { componentId } = useComponentId(id);
  const translations = useTranslations<FormboxTranslations>({
    customTranslations,
    fallbackTranslations: formboxTranslations,
  });
  const { readOnlyLabel } = translations;

  const combineRefs = makeCombineRefs<HTMLLabelElement>(ref, forwardedRef);

  return (
    <FormboxContainer<'label'>
      as="label"
      autoFilled={autoFilled}
      centered={centered}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={empty}
      focused={focused || visuallyFocused}
      hasIconAfter={!!iconAfter}
      hasIconBefore={!!iconBefore}
      id={componentId}
      inputWidth={inputWidth}
      label={label}
      onBlur={handleBlur}
      onFocus={handleFocus}
      readOnly={readOnly}
      ref={combineRefs}
      size={size}
      style={style}
      themeId={themeId}
      transitional={transitional}
      transparent={transparent}
      type={type}
      unthemed={unthemed}
      validity={validity}
      variant={variant}
      width={width}
      {...(props as Omit<FormboxContainerProps<'label'>, 'as' | 'type'>)}
    >
      {iconBefore && (
        <FormboxIcon
          actionable={iconBeforeActionable}
          className={iconBeforeClassName}
          icon={iconBefore}
          position="before"
          variant={variant}
        />
      )}
      {renderInput({
        focused: focused || visuallyFocused,
        id: componentId,
        required,
        variant,
      })}
      {readOnly && (
        <FormboxIcon
          className={iconAfterClassName}
          icon={<PencilSlashIcon scale="small" title={readOnlyLabel} />}
          position="after"
          variant={variant}
        />
      )}
      {iconAfter && (
        <FormboxIcon
          actionable={iconAfterActionable}
          className={iconAfterClassName}
          icon={iconAfter}
          position="after"
          variant={variant}
        />
      )}
    </FormboxContainer>
  );
}

/**
 * The formbox component is the base component used
 * by text inputs, password inputs, select inputs and
 * textareas for all their custom styling. It accepts
 * a child function to render the input itself and adds
 * optional icons before and after the form input.
 */
export const Formbox = React.forwardRef(FormboxBase);

FormboxBase.displayName = 'FormboxBase';
Formbox.displayName = 'Formbox';
