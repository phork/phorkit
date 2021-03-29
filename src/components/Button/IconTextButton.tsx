import { cx } from '@emotion/css';
import React, { useCallback, useState } from 'react';
import { renderFromProp, renderFromPropWithFallback, RenderFromPropElement } from '../../utils/renderFromProp';
import { Button, ButtonProps } from './Button';
import styles from './styles/Button.module.css';

export interface IconTextButtonProps extends Omit<ButtonProps, 'icon'> {
  icon: RenderFromPropElement;
  collapsed?: boolean;
  manual?: boolean;
  text: RenderFromPropElement;
}

export function IconTextButton({
  className,
  icon,
  collapsed,
  manual,
  shape,
  text,
  ...props
}: IconTextButtonProps): React.ReactElement {
  const [focused, setFocused] = useState(false);
  const handleBlur = useCallback(() => setFocused(false), []);
  const handleFocus = useCallback(() => setFocused(true), []);

  const classes = cx(
    styles['button--iconText'],
    (collapsed || (!manual && !focused)) && styles['is-collapsed'],
    className,
  );

  return (
    <Button
      className={classes}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseOut={handleBlur}
      onMouseOver={handleFocus}
      shape={shape}
      weight={!shape ? 'text' : undefined}
      {...props}
    >
      <span className={styles.button__icon}>{renderFromProp(icon)}</span>
      <span className={styles.button__text}>{renderFromPropWithFallback(text)}</span>
    </Button>
  );
}
