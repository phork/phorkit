import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementProps, Orientation, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { renderFromProp } from '../../utils/renderFromProp';
import styles from './styles/ButtonGroup.module.css';
import { Button, ButtonProps } from './Button';
import { ButtonColor, ButtonSize, ButtonWeight } from './types';

export type ButtonGroupSpacing = 'divided' | 'joined' | 'cozy' | 'comfy';
export type ButtonGroupAlignment = 'left' | 'center' | 'right';

export type ButtonGroupItem = {
  id: string;
  label: React.ReactChild | React.ReactFragment | ((selected: boolean) => JSX.Element);
  selected?: boolean;
} & Omit<ButtonProps, 'children' | 'id' | 'key' | 'size' | 'value'>;

export type LocalButtonGroupProps = Pick<ButtonProps, 'color' | 'fullWidth' | 'shape'> &
  Omit<ThemeProps, 'unthemed'> & {
    /** This is button group alignment (not button alignment) */
    align?: ButtonGroupAlignment;
    buttons?: readonly ButtonGroupItem[];
    /** The children are allowed to be null or false so this won't fail if children are conditional */
    children?: Array<React.ReactElement | null | false>;
    className?: string;
    /** Uses inline-flex or block so the buttons aren't stretched by flexbox */
    display?: 'inline' | 'block';
    /** If onClick is undefined then each button must have its own onClick prop */
    onClick?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, value: string) => void;
    orientation?: Orientation;
    selectedColor?: ButtonColor;
    selectedStyle?: React.CSSProperties;
    selectedWeight?: ButtonWeight;
    size?: ButtonSize;
    spacing?: ButtonGroupSpacing;
    style?: React.CSSProperties;
    weight?: ButtonWeight;
    /** Button groups can wrap if they're horizontal and have cozy or comfy spacing */
    wrap?: boolean;
  };

export type ButtonGroupProps = MergeElementProps<'div', LocalButtonGroupProps>;

/**
 * The button group renders a collection of `Button`
 * components with a uniform amount of spacing between
 * them (or no spacing at all). Button groups can be
 * oriented horizontally or vertically.
 */
export function ButtonGroup({
  align,
  buttons,
  children,
  className,
  color,
  contrast = false,
  display,
  fullWidth = false,
  onClick,
  orientation = 'horizontal',
  selectedColor,
  selectedStyle,
  selectedWeight = 'solid',
  shape = 'pill',
  size = 'medium',
  spacing,
  themeId: initThemeId,
  weight = 'outlined',
  wrap: initWrap = false,
  ...props
}: ButtonGroupProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const wrap = initWrap && orientation === 'horizontal' && spacing && ['cozy', 'comfy'].includes(spacing);

  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => {
      // [TODO:ts] revisit casting
      onClick && onClick(event, (event.target as HTMLElement).getAttribute('data-value') as string);
    },
    [onClick],
  );

  // if this returns undefined then it renders a normal button
  const renderLabel = (
    id: ButtonGroupItem['id'],
    label: ButtonGroupItem['label'],
    selected: ButtonGroupItem['selected'],
  ) => {
    if (typeof label === 'function') {
      return React.cloneElement(label(!!selected), {
        key: id,
        className: styles.buttonGroup__button,
        ...(onClick ? { onClick: handleClick } : {}),
        'data-value': id,
      });
    }
    return undefined;
  };

  const renderButtonsFromChildren = (children: ButtonGroupProps['children']) => {
    return children
      ? children.map(child =>
          child
            ? renderFromProp(child, {
                className: styles.buttonGroup__button,
                ...(onClick ? { onClick: handleClick } : {}),
              })
            : null,
        )
      : undefined;
  };

  return (
    <div
      className={cx(
        styles.buttonGroup,
        fullWidth && styles['buttonGroup--fullWidth'],
        align && styles[`buttonGroup--${align}`],
        display && styles[`buttonGroup--${display}`],
        orientation && styles[`buttonGroup--${orientation}`],
        spacing && styles[`buttonGroup--${spacing}`],
        themeId && styles[`buttonGroup--${themeId}`],
        wrap && styles['buttonGroup--wrap'],
        className,
      )}
      role="group"
      {...props}
    >
      {buttons &&
        buttons.map(
          ({ id, label, selected, style, ...button }: ButtonGroupItem) =>
            renderLabel(id, label, selected) || (
              <Button
                align={orientation === 'vertical' ? 'left' : 'center'}
                className={styles.buttonGroup__button}
                color={selected && selectedColor ? selectedColor : color}
                contrast={contrast}
                onClick={handleClick}
                shape={shape}
                themeId={themeId}
                weight={selected && selectedWeight ? selectedWeight : weight}
                {...button}
                data-value={id}
                key={id}
                size={size}
                style={
                  fullWidth
                    ? {
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        ...style,
                        ...(selected ? selectedStyle : {}),
                      }
                    : { ...style, ...(selected ? selectedStyle : {}) }
                }
              >
                {label}
              </Button>
            ),
        )}

      {!buttons && children && renderButtonsFromChildren(Array.isArray(children) ? children : [children])}
    </div>
  );
}

ButtonGroup.displayName = 'ButtonGroup';
