import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { Fieldset } from '../Fieldset/Fieldset';
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

export type LocalCheckboxGroupProps<V extends CheckboxValue = string> = ThemeProps & {
  className?: string;
  legend: React.ReactNode;
  layout: 'stacked' | 'inline';
  onChange: (event: React.ChangeEvent<HTMLInputElement>, values: Array<V>) => void;
  checkboxes: CheckboxGroupItem<V>[];
  size?: CheckboxSize;
  style?: React.CSSProperties;
  values?: Array<V>;
  variant?: CheckboxProps<V>['variant'];
};

export type CheckboxGroupProps<V extends CheckboxValue = string> = Omit<
  MergeElementPropsWithoutRef<'div', LocalCheckboxGroupProps<V>>,
  'children'
>;

export type CheckboxGroupRef = React.ForwardedRef<HTMLFieldSetElement>;

export function CheckboxGroupBase<V extends CheckboxValue = string>(
  {
    checkboxes,
    className,
    contrast = false,
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
  const { generateComponentId } = useComponentId();

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
    <Fieldset className={className} contrast={contrast} legend={legend} ref={forwardedRef} themeId={themeId}>
      <div className={cx(styles.checkboxGroup, layout && styles[`checkboxGroup--${layout}`])} {...props}>
        {checkboxes &&
          checkboxes.map(({ id, label, value: checkboxValue, ...checkboxProps }) => (
            <Checkbox<V>
              checked={values?.includes(checkboxValue)}
              className={cx(styles.checkbox, styles[`checkbox--${layout}`])}
              contrast={contrast}
              id={generateComponentId(id)}
              key={id}
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
 * The checkbox group renders a collection of checkboxes
 * in an inline or a stacked layout with a legend.
 *
 * The checked states should be stored outside of this
 * component and are updated by the onChange callback.
 */
export const CheckboxGroup = React.forwardRef(CheckboxGroupBase) as <V extends CheckboxValue = string>(
  p: CheckboxGroupProps<V> & { ref?: React.Ref<HTMLFieldSetElement> },
) => React.ReactElement<HTMLFieldSetElement>;

// note that the base element cannot have a displayName because it breaks Storybook
(CheckboxGroup as React.NamedExoticComponent).displayName = 'CheckboxGroup';
