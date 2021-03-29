import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementProps, ThemeProps } from '../../../types';
import { useComponentId } from '../../../hooks/useComponentId';
import { useThemeId } from '../../../hooks/useThemeId';
import { Fieldset } from '../Fieldset/Fieldset';
import { Radio, RadioProps } from './Radio';
import styles from './styles/RadioGroup.module.css';

export interface RadioGroupItem extends Omit<RadioProps, 'children' | 'grouped' | 'id' | 'onChange' | 'value'> {
  id: string;
  label: RadioProps['children'];
  value: string | number;
}

export interface LocalRadioGroupProps extends ThemeProps {
  className?: string;
  legend: React.ReactNode;
  layout: 'stacked' | 'inline';
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: RadioProps['value']) => void;
  radios: RadioGroupItem[];
  value?: string | number;
}

export type RadioGroupProps = MergeElementProps<'div', LocalRadioGroupProps>;

export function RadioGroup({
  className,
  contrast,
  layout,
  legend,
  name,
  onChange,
  radios,
  themeId: initThemeId,
  value,
  ...props
}: RadioGroupProps): React.ReactElement<RadioGroupProps, 'fieldset'> {
  const themeId = useThemeId(initThemeId);
  const { generateComponentId } = useComponentId();

  const handleChange = useCallback<RadioProps['onChange']>(
    (event, checked) => {
      checked && onChange(event, event.target.value);
    },
    [onChange],
  );

  return (
    <Fieldset className={className} contrast={contrast} legend={legend} themeId={themeId}>
      <div className={cx(styles.radioGroup, layout && styles[`radioGroup--${layout}`])} {...props}>
        {radios &&
          radios.map(({ id, label, value: radioValue, ...radioProps }) => (
            <Radio
              checked={radioValue === value}
              contrast={contrast}
              grouped={layout}
              id={generateComponentId(id)}
              key={id}
              name={name}
              onChange={handleChange}
              themeId={themeId}
              value={radioValue}
              {...radioProps}
            >
              {label}
            </Radio>
          ))}
      </div>
    </Fieldset>
  );
}
