import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useComponentId } from '../../../hooks/useComponentId';
import { useThemeId } from '../../../hooks/useThemeId';
import { Fieldset } from '../Fieldset/Fieldset';
import { Checkbox, CheckboxProps } from './Checkbox';
import styles from './styles/CheckboxGroup.module.css';

export interface CheckboxGroupItem extends Omit<CheckboxProps, 'children' | 'grouped' | 'id' | 'onChange' | 'value'> {
  id: string;
  label: CheckboxProps['children'];
  value: string | number;
}

export interface LocalCheckboxGroupProps extends ThemeProps {
  className?: string;
  legend: React.ReactNode;
  layout: 'stacked' | 'inline';
  onChange: (event: React.ChangeEvent<HTMLInputElement>, values: Array<CheckboxProps['value']>) => void;
  checkboxes: CheckboxGroupItem[];
  values: Array<CheckboxProps['value']>;
  variant?: CheckboxProps['variant'];
}

export type CheckboxGroupProps = MergeElementPropsWithoutRef<'div', LocalCheckboxGroupProps> & {
  ref?: React.Ref<HTMLFieldSetElement>;
};

function CheckboxGroupBase(
  {
    className,
    contrast,
    layout = 'inline',
    legend,
    onChange,
    checkboxes,
    // this allows us to spread the rest of the props without typescript erroring
    ref: ignoredRef,
    themeId: initThemeId,
    values,
    variant,
    ...props
  }: CheckboxGroupProps,
  forwardedRef: React.ForwardedRef<HTMLFieldSetElement>,
): React.ReactElement<CheckboxGroupProps, 'fieldset'> {
  const themeId = useThemeId(initThemeId);
  const { generateComponentId } = useComponentId();

  const handleChange = useCallback<CheckboxProps['onChange']>(
    (event, checked, value) => {
      const addValue = (event: React.ChangeEvent<HTMLInputElement>, value: string | number) =>
        !values.includes(value) && onChange(event, [...values, value]);
      const removeValue = (event: React.ChangeEvent<HTMLInputElement>, value: string | number) =>
        values.includes(value) &&
        onChange(
          event,
          values.filter(item => item !== value),
        );

      checked ? addValue(event, value) : removeValue(event, value);
    },
    [onChange, values],
  );

  return (
    <Fieldset className={className} contrast={contrast} legend={legend} themeId={themeId} ref={forwardedRef}>
      <div className={cx(styles.checkboxGroup, layout && styles[`checkboxGroup--${layout}`])} {...props}>
        {checkboxes &&
          checkboxes.map(({ id, label, value: checkboxValue, ...checkboxProps }) => (
            <Checkbox
              checked={values.includes(checkboxValue)}
              contrast={contrast}
              grouped={layout}
              id={generateComponentId(id)}
              key={id}
              themeId={themeId}
              value={checkboxValue}
              onChange={handleChange}
              variant={variant}
              {...checkboxProps}
            >
              {label}
            </Checkbox>
          ))}
      </div>
    </Fieldset>
  );
}

export const CheckboxGroup = React.forwardRef(CheckboxGroupBase);
CheckboxGroupBase.displayName = 'CheckboxGroupBase';
