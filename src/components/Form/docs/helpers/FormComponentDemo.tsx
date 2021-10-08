import React, { useState } from 'react';
import { ThemeWrapper, ThemeWrapperProps } from 'docs/helpers/ThemeWrapper';

export type FormComponentDemoProps = {
  contrast?: boolean;
  children: React.ReactElement;
  initialValue?: string | number | boolean | Array<string | number | undefined>;
  property: string;
  unwrapped?: boolean;
  type: 'checkbox' | 'password' | 'radio' | 'select' | 'slider' | 'stepper' | 'textarea' | 'textbox' | 'toggle';
  variant?: ThemeWrapperProps['variant'];
};

export function FormComponentDemo({
  contrast = false,
  children,
  initialValue,
  property,
  unwrapped = false,
  type,
  variant,
  ...props
}: FormComponentDemoProps) {
  const [value, setValue] = useState<FormComponentDemoProps['initialValue']>(initialValue);
  const clearable = ['textbox', 'password'].includes(type);

  const content = (
    <div style={{ maxWidth: 400 }}>
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

  return unwrapped ? (
    <div {...props}>{content}</div>
  ) : (
    <ThemeWrapper contrast={contrast} variant={variant} {...props}>
      {content}
    </ThemeWrapper>
  );
}
