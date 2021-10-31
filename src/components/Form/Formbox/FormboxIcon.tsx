import { cx } from '@emotion/css';
import React from 'react';
import { renderFromProp, RenderFromPropElement } from '../../../utils/renderFromProp';
import { IconScale } from '../../..';
import styles from './styles/FormboxIcon.module.css';
import { FormboxIconPosition, FormboxVariant } from './types';

export type FormboxIconRenderProps = {
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  tabIndex?: number;
};

export type FormboxIconProps = {
  actionable?: boolean;
  className?: string;
  icon: RenderFromPropElement<FormboxIconRenderProps & { size?: number; scale?: IconScale }>;
  onBlur?: (event: React.FocusEvent<HTMLElement>, position: FormboxIconPosition) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>, position: FormboxIconPosition) => void;
  position: FormboxIconPosition;
  variant: FormboxVariant;
};

/**
 * The formbox icon adds all the necessary styles around
 * an SVG icon, as well as `onBlur` and `onFocus` event
 * handlers.
 */
export const FormboxIcon = ({
  actionable = false,
  className,
  icon,
  onBlur,
  onFocus,
  position,
  variant,
}: FormboxIconProps): JSX.Element | null => {
  const autoSize = !(
    typeof icon === 'object' &&
    (icon.type === 'button' || (icon.props && (icon.props.size || icon.props.scale)))
  );

  return renderFromProp<FormboxIconRenderProps & { tabIndex?: number }>(icon, {
    className: cx(
      styles.formboxIcon,
      actionable && styles['formboxIcon--actionable'],
      autoSize && styles['formboxIcon--autoSize'],
      position && styles[`formboxIcon--${position}`],
      variant && styles[`formboxIcon--${variant}`],
      typeof icon === 'object' && icon.props && icon.props.className,
      className,
    ),
    onBlur: actionable ? (event: React.FocusEvent<HTMLElement>) => onBlur && onBlur(event, position) : undefined,
    onFocus: actionable ? (event: React.FocusEvent<HTMLElement>) => onFocus && onFocus(event, position) : undefined,
    tabIndex: actionable ? 0 : undefined,
  });
};

FormboxIcon.displayName = 'FormboxIcon';
