import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
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
  variant?: RadioProps['variant'];
}

export type RadioGroupProps = MergeElementPropsWithoutRef<'div', LocalRadioGroupProps> & {
  ref?: React.Ref<HTMLFieldSetElement>;
};

function RadioGroupBase(
  {
    className,
    contrast,
    layout,
    legend,
    name,
    onChange,
    radios,
    // this allows us to spread the rest of the props without typescript erroring
    ref: ignoredRef,
    themeId: initThemeId,
    value,
    variant,
    ...props
  }: RadioGroupProps,
  forwardedRef: React.ForwardedRef<HTMLFieldSetElement>,
): React.ReactElement<RadioGroupProps, 'fieldset'> {
  const themeId = useThemeId(initThemeId);
  const { generateComponentId } = useComponentId();

  const handleChange = useCallback<RadioProps['onChange']>(
    (event, checked) => {
      checked && onChange(event, event.target.value);
    },
    [onChange],
  );

  return (
    <Fieldset className={className} contrast={contrast} legend={legend} themeId={themeId} ref={forwardedRef}>
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
              variant={variant}
              {...radioProps}
            >
              {label}
            </Radio>
          ))}
      </div>
    </Fieldset>
  );
}

export const RadioGroup = React.forwardRef(RadioGroupBase);
RadioGroupBase.displayName = 'RadioGroupBase';
