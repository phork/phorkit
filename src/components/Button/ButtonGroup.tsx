import { cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { MergeElementProps, Orientation, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { Button, ButtonProps } from './Button';
import styles from './styles/ButtonGroup.module.css';

export type ButtonGroupSpacing = 'joined' | 'cozy' | 'comfy';

export type ButtonGroupItem = {
  id: string;
  label: React.ReactNode;
  selected?: boolean;
} & Omit<ButtonProps, 'children' | 'id' | 'key' | 'onClick' | 'style' | 'value'>;

export interface LocalButtonGroupProps extends Pick<ButtonProps, 'color' | 'fullWidth' | 'shape'>, ThemeProps {
  align?: 'left' | 'right';
  buttons?: ButtonGroupItem[];
  children?: React.ReactElement[];
  className?: string;
  onClick: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, value: string) => void;
  orientation?: Orientation;
  overlap?: boolean;
  spacing?: ButtonGroupSpacing;
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
  orientation,
  overlap,
  shape = 'pill',
  spacing,
  themeId: initThemeId,
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
        onClick: event => onClick(event, id),
      });
    }
    return undefined;
  };

  const renderButtonsFromChildren = () => {
    return children
      ? children.map(child =>
          React.cloneElement(child, {
            className: styles.buttonGroup__button,
          }),
        )
      : undefined;
  };

  return (
    <div
      className={cx(
        styles.buttonGroup,
        align && styles[`buttonGroup--${align}`],
        orientation && styles[`buttonGroup--${orientation}`],
        spacing && styles[`buttonGroup--${spacing}`],
        overlap && styles['buttonGroup--overlap'],
        fullWidth && styles['buttonGroup--fullWidth'],
        className,
      )}
      {...props}
    >
      {buttons &&
        buttons.map(
          ({ id, label, selected, ...button }: ButtonGroupItem) =>
            renderLabel(id, label, selected) || (
              <Button
                className={styles.buttonGroup__button}
                color={color}
                contrast={contrast}
                shape={shape}
                themeId={themeId}
                weight={!selected ? 'outline' : undefined}
                {...button}
                key={id}
                onClick={handleClick}
                style={fullWidth ? { display: 'flex', flex: 1, justifyContent: 'center' } : undefined}
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
