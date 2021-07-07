import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ThemeWrapper } from 'docs/helpers/ThemeWrapper';

export function FormComponentDemo({
  contrast = false,
  children,
  initialValue,
  property,
  unwrapped = false,
  type,
  variant,
  ...props
}) {
  const [value, setValue] = useState(initialValue);
  const clearable = ['textbox', 'password'].includes(type);

  const content = (
    <div style={{ maxWidth: 400 }}>
      {React.cloneElement(children, {
        [property]: value,
        onChange: (event, value) => {
          setValue(value);
          children.props.onChange && children.props.onChange(event, value);
        },
        ...(clearable
          ? {
              onClear: event => {
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

FormComponentDemo.defaultProps = {
  contrast: false,
  initialValue: undefined,
  unwrapped: false,
  variant: undefined,
};

FormComponentDemo.propTypes = {
  property: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  contrast: PropTypes.bool,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
  unwrapped: PropTypes.bool,
  variant: PropTypes.string,
};
