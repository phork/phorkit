import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeProps, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { Fieldset, FieldsetProps } from '../Fieldset/Fieldset';
import styles from './styles/CheckboxGroup.module.css';
import { Checkbox, CheckboxProps, CheckboxSize, CheckboxValue } from './Checkbox';

export type CheckboxGroupItem<V extends CheckboxValue = string> = Omit<
  CheckboxProps<V>,
  'children' | 'grouped' | 'id' | 'onChange' | 'value'
> & {
  id: string;
  label: CheckboxProps<V>['children'];
  value: V;
};

export type LocalCheckboxGroupProps<V extends CheckboxValue = string> = Omit<ThemeProps, 'unthemed'> & {
  className?: string;
  legend?: React.ReactChild | React.ReactFragment | null;
  layout: 'stacked' | 'inline';
  onChange: (event: React.ChangeEvent<HTMLInputElement>, values: readonly V[]) => void;
  checkboxes: readonly CheckboxGroupItem<V>[];
  size?: CheckboxSize;
  style?: React.CSSProperties;
  values?: readonly V[];
  variant?: CheckboxProps<V>['variant'];
};

export type CheckboxGroupProps<V extends CheckboxValue = string> = MergeProps<
  Omit<FieldsetProps, 'children'>,
  LocalCheckboxGroupProps<V>
>;

export type CheckboxGroupRef = React.ForwardedRef<HTMLFieldSetElement>;

export function CheckboxGroupBase<V extends CheckboxValue = string>(
  {
    checkboxes,
    className,
    contrast = false,
    id,
    layout = 'inline',
    legend,
    onChange,
    size,
    themeId: initThemeId,
    values,
    variant,
    ...props
  }: CheckboxGroupProps<V>,
  forwardedRef: React.ForwardedRef<HTMLFieldSetElement>,
): React.ReactElement<CheckboxGroupProps<V>, 'fieldset'> {
  const themeId = useThemeId(initThemeId);
  const { generateComponentId } = useComponentId(id);

  const handleChange = useCallback<CheckboxProps<V>['onChange']>(
    (event, checked, value) => {
      const addValue = (event: React.ChangeEvent<HTMLInputElement>, value: V) =>
        !values?.includes(value) && onChange(event, [...(values || []), value]);

      const removeValue = (event: React.ChangeEvent<HTMLInputElement>, value: V) =>
        values?.includes(value) &&
        onChange(
          event,
          values.filter(item => item !== value),
        );

      checked ? addValue(event, value) : removeValue(event, value);
    },
    [onChange, values],
  );

  return (
    <Fieldset className={className} contrast={contrast} legend={legend} ref={forwardedRef} themeId={themeId} {...props}>
      <div className={cx(styles.checkboxGroup, layout && styles[`checkboxGroup--${layout}`])}>
        {checkboxes &&
          checkboxes.map(({ id: checkboxId, label, value: checkboxValue, ...checkboxProps }) => (
            <Checkbox<V>
              checked={values?.includes(checkboxValue)}
              className={cx(styles.checkbox, styles[`checkbox--${layout}`])}
              contrast={contrast}
              id={generateComponentId(checkboxId)}
              key={checkboxId}
              onChange={handleChange}
              size={size}
              themeId={themeId}
              value={checkboxValue}
              variant={variant}
              {...(checkboxProps as Omit<CheckboxProps<V>, 'onChange'>)}
            >
              {label}
            </Checkbox>
          ))}
      </div>
    </Fieldset>
  );
}

/**
 * The checkbox group renders a collection of `Checkbox`
 * components with a legend in an inline or a stacked
 * layout.
 *
 * The checked states should be stored outside of this
 * component and are updated by the `onChange` callback.
 */
export const CheckboxGroup = React.forwardRef(CheckboxGroupBase) as <V extends CheckboxValue = string>(
  p: CheckboxGroupProps<V> & { ref?: React.Ref<HTMLFieldSetElement> },
) => React.ReactElement<HTMLFieldSetElement>;

// note that the base element cannot have a displayName because it breaks Storybook
(CheckboxGroup as React.NamedExoticComponent).displayName = 'CheckboxGroup';
