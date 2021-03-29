import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementProps, ThemeProps } from '../../../types';
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
}

export type CheckboxGroupProps = MergeElementProps<'div', LocalCheckboxGroupProps>;

export function CheckboxGroup({
  className,
  contrast,
  layout = 'inline',
  legend,
  onChange,
  checkboxes,
  themeId: initThemeId,
  values,
  ...props
}: CheckboxGroupProps): React.ReactElement<CheckboxGroupProps, 'fieldset'> {
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
    <Fieldset className={className} contrast={contrast} legend={legend} themeId={themeId}>
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
              {...checkboxProps}
            >
              {label}
            </Checkbox>
          ))}
      </div>
    </Fieldset>
  );
}
