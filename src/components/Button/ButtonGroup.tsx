import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementProps, Orientation, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { renderFromProp } from '../../utils';
import { Button, ButtonProps } from './Button';
import styles from './styles/ButtonGroup.module.css';
import { ButtonColor, ButtonSize, ButtonWeight } from './types';

export type ButtonGroupSpacing = 'divided' | 'joined' | 'cozy' | 'comfy';

export type ButtonGroupItem = {
  id: string;
  label: React.ReactNode | ((selected: boolean) => JSX.Element);
  selected?: boolean;
  style?: React.CSSProperties;
} & Omit<ButtonProps, 'children' | 'id' | 'key' | 'size' | 'style' | 'value'>;

export interface LocalButtonGroupProps extends Pick<ButtonProps, 'color' | 'fullWidth' | 'shape'>, ThemeProps {
  align?: 'left' | 'right';
  buttons?: ButtonGroupItem[];
  /** The children are allowed to be null or false so this won't fail if children are conditional */
  children?: Array<React.ReactElement | null | false>;
  className?: string;
  /** If onClick is undefined then each button must have its own onClick prop */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, value: string) => void;
  orientation?: Orientation;
  selectedColor?: ButtonColor;
  selectedStyle?: React.CSSProperties;
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
  selectedStyle,
  selectedWeight = 'solid',
  shape = 'pill',
  size = 'medium',
  spacing,
  themeId: initThemeId,
  weight = 'outlined',
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

  const renderButtonsFromChildren = () => {
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
                onClick={handleClick}
                shape={shape}
                themeId={themeId}
                weight={selected && selectedWeight ? selectedWeight : weight}
                {...button}
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
