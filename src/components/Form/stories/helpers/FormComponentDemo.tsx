import React, { useState } from 'react';

export type FormComponentDemoProps = {
  children: React.ReactElement;
  initialValue?: string | number | boolean | ReadonlyArray<string | number | undefined>;
  property: string;
  style?: React.CSSProperties;
  type: 'checkbox' | 'password' | 'radio' | 'select' | 'slider' | 'stepper' | 'textarea' | 'textbox' | 'toggle';
};

export function FormComponentDemo({ children, initialValue, property, style, type }: FormComponentDemoProps) {
  const [value, setValue] = useState<FormComponentDemoProps['initialValue']>(initialValue);
  const clearable = ['textbox', 'password'].includes(type);

  return (
    <div style={{ maxWidth: 400, ...style }}>
      {React.cloneElement(children, {
        [property]: value,
        onChange: (event: React.ChangeEvent, value: FormComponentDemoProps['initialValue']) => {
          setValue(value);
          children.props.onChange && children.props.onChange(event, value);
        },
        ...(clearable
          ? {
              onClear: (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
                setValue('');
                children.props.onClear && children.props.onClear(event);
              },
            }
          : {}),
      })}
    </div>
  );
}
