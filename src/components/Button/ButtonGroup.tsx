import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementProps, Orientation, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { Button, ButtonColor, ButtonProps, ButtonSize, ButtonWeight } from './Button';
import styles from './styles/ButtonGroup.module.css';

export type ButtonGroupSpacing = 'divided' | 'joined' | 'cozy' | 'comfy';

export type ButtonGroupItem = {
  id: string;
  label: React.ReactNode;
  selected?: boolean;
  style?: React.CSSProperties;
} & Omit<ButtonProps, 'children' | 'id' | 'key' | 'onClick' | 'shape' | 'size' | 'style' | 'value'>;

export interface LocalButtonGroupProps extends Pick<ButtonProps, 'color' | 'fullWidth' | 'shape'>, ThemeProps {
  align?: 'left' | 'right';
  buttons?: ButtonGroupItem[];
  children?: React.ReactElement[];
  className?: string;
  onClick: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, value: string) => void;
  orientation?: Orientation;
  selectedColor?: ButtonColor;
  selectedWeight?: ButtonWeight;
  size?: ButtonSize;
  spacing?: ButtonGroupSpacing;
  weight?: ButtonWeight;
}

export type ButtonGroupProps = MergeElementProps<'div', LocalButtonGroupProps>;

export function ButtonGroup({
  align,
  buttons,
  children,
  className,
  color,
  contrast,
  fullWidth,
  onClick,
  orientation = 'horizontal',
  selectedColor,
  selectedWeight = 'filled',
  shape = 'pill',
  size = 'medium',
  spacing,
  themeId: initThemeId,
  weight = 'outline',
  ...props
}: ButtonGroupProps): React.ReactElement<ButtonGroupProps, 'div'> {
  const themeId = useThemeId(initThemeId);

  const handleClick = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent) => {
      // [TODO:ts] revisit casting
      onClick && onClick(event, (event.target as HTMLElement).getAttribute('data-value') as string);
    },
    [onClick],
  );

  const renderLabel = (
    id: ButtonGroupItem['id'],
    label: ButtonGroupItem['label'],
    selected: ButtonGroupItem['selected'],
  ) => {
    if (typeof label === 'function') {
      return React.cloneElement(label(selected), {
        key: id,
        className: styles.buttonGroup__button,
        onClick: handleClick,
        'data-value': id,
      });
    }
    return undefined;
  };

  const renderButtonsFromChildren = () => {
    return children
      ? children.map(child =>
          React.cloneElement(child, {
            className: styles.buttonGroup__button,
            onClick: handleClick,
          }),
        )
      : undefined;
  };

  return (
    <div
      className={cx(
        styles.buttonGroup,
        align && styles[`buttonGroup--${align}`],
        fullWidth && styles['buttonGroup--fullWidth'],
        orientation && styles[`buttonGroup--${orientation}`],
        spacing && styles[`buttonGroup--${spacing}`],
        themeId && styles[`buttonGroup--${themeId}`],
        className,
      )}
      {...props}
    >
      {buttons &&
        buttons.map(
          ({ id, label, selected, style, ...button }: ButtonGroupItem) =>
            renderLabel(id, label, selected) || (
              <Button
                className={styles.buttonGroup__button}
                color={selected && selectedColor ? selectedColor : color}
                contrast={contrast}
                shape={shape}
                themeId={themeId}
                weight={selected && selectedWeight ? selectedWeight : weight}
                {...button}
                key={id}
                onClick={handleClick}
                size={size}
                style={fullWidth ? { display: 'flex', flex: 1, justifyContent: 'center', ...style } : style}
                data-value={id}
              >
                {label}
              </Button>
            ),
        )}

      {!buttons && Array.isArray(children) ? renderButtonsFromChildren() : children}
    </div>
  );
}

ButtonGroup.displayName = 'ButtonGroup';
