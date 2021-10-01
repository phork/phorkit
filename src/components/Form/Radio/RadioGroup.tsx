import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { useComponentId } from '../../../hooks/useComponentId';
import { Fieldset } from '../Fieldset/Fieldset';
import styles from './styles/RadioGroup.module.css';
import { Radio, RadioProps, RadioSize, RadioValue } from './Radio';

export type RadioGroupItem<V extends RadioValue = string> = Omit<
  RadioProps<V>,
  'children' | 'grouped' | 'id' | 'onChange' | 'value'
> & {
  id: string;
  label: RadioProps<V>['children'];
  value: V;
};

export type LocalRadioGroupProps<V extends RadioValue = string> = ThemeProps & {
  className?: string;
  legend: React.ReactNode;
  layout: 'stacked' | 'inline';
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: V) => void;
  radios: RadioGroupItem<V>[];
  size?: RadioSize;
  style?: React.CSSProperties;
  value?: V;
  variant?: RadioProps['variant'];
};

export type RadioGroupProps<V extends RadioValue = string> = Omit<
  MergeElementPropsWithoutRef<'div', LocalRadioGroupProps<V>>,
  'children'
>;

export type RadioGroupRef = React.ForwardedRef<HTMLFieldSetElement>;

export function RadioGroupBase<V extends RadioValue = string>(
  {
    className,
    contrast = false,
    layout = 'inline',
    legend,
    name,
    onChange,
    radios,
    size,
    themeId: initThemeId,
    value,
    variant,
    ...props
  }: RadioGroupProps<V>,
  forwardedRef: React.ForwardedRef<HTMLFieldSetElement>,
): React.ReactElement<RadioGroupProps<V>, 'fieldset'> {
  const themeId = useThemeId(initThemeId);
  const { generateComponentId } = useComponentId();

  const handleChange = useCallback<RadioProps<V>['onChange']>(
    (event, checked) => {
      checked && onChange(event, event.target.value as V);
    },
    [onChange],
  );

  return (
    <Fieldset className={className} contrast={contrast} legend={legend} ref={forwardedRef} themeId={themeId}>
      <div className={cx(styles.radioGroup, layout && styles[`radioGroup--${layout}`])} {...props}>
        {radios &&
          radios.map(({ id, label, value: radioValue, ...radioProps }) => (
            <Radio<V>
              checked={radioValue === value}
              className={cx(styles.radio, styles[`radio--${layout}`])}
              contrast={contrast}
              id={generateComponentId(id)}
              key={id}
              name={name}
              onChange={handleChange}
              size={size}
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

/**
 * The radio group renders a collection of radio buttons
 * in an inline or a stacked layout with a legend.
 *
 * The checked state should be stored outside of this
 * component and is updated by the onChange callback.
 */
export const RadioGroup = React.forwardRef(RadioGroupBase) as <V extends RadioValue = string>(
  p: RadioGroupProps<V> & { ref?: React.Ref<HTMLFieldSetElement> },
) => React.ReactElement<HTMLFieldSetElement>;

// note that the base element cannot have a displayName because it breaks Storybook
(RadioGroup as React.NamedExoticComponent).displayName = 'RadioGroup';
