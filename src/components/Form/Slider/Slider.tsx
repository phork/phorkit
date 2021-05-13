import { cx } from '@emotion/css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useAccessibility } from '../../../context/Accessibility/useAccessibility';
import { useComponentId } from '../../../hooks/useComponentId';
import { useDimensions } from '../../../hooks/useDimensions';
import { useThemeId } from '../../../hooks/useThemeId';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { Draggable, DraggableProps } from '../../Draggable';
import { Label } from '../Label/Label';
import styles from './styles/Slider.module.css';

type SliderEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent
  | React.KeyboardEvent
  | React.ChangeEvent<HTMLInputElement>;

export interface LocalSliderProps extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  formatValue?: (value?: number) => React.ReactNode;
  id?: string;
  max?: number;
  min?: number;
  name?: string;
  onChange?: (event: SliderEvent, value: number) => void;
  persistEvents?: boolean;
  scale?: 'small';
  /** Snap the value to the closest step */
  snap?: boolean;
  /** Force the snap to the next step; otherwise it goes to the closest one */
  snapNext?: boolean;
  step?: number;
  tick?: number;
  tickElement?: React.ElementType;
  tickProps?: any;
  trackElement?: React.ElementType;
  trackProps?: any;
  unstyled?: boolean;
  validity?: 'danger';
  value?: number;
  valuePosition?: 'top' | 'right';
  width?: string;
}

export type SliderProps = MergeElementPropsWithoutRef<'label', LocalSliderProps> & {
  ref?: React.Ref<HTMLInputElement>;
};

function SliderBase(
  {
    children,
    className,
    contrast,
    disabled,
    formatValue,
    id,
    max = 100,
    min = 0,
    name,
    onChange,
    persistEvents,
    // this allows us to spread the rest of the props without typescript erroring
    ref: ignoredRef,
    scale,
    snap,
    snapNext,
    step = 1,
    themeId: initThemeId,
    tick,
    tickElement,
    tickProps,
    trackElement,
    trackProps,
    unstyled,
    validity,
    value = 0,
    valuePosition,
    width: propWidth,
    ...props
  }: SliderProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const accessible = useAccessibility();
  const themeId = useThemeId(initThemeId);
  const [focused, setFocused] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragged, setDragged] = useState<number>();
  const containerRef = useRef<HTMLElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const { generateComponentId } = useComponentId(id);
  const width = containerRef.current && containerRef.current.offsetWidth;
  const color = !unstyled && (contrast ? 'contrast' : 'primary');

  const SliderTrack = trackElement || 'div';
  const SliderTick = tickElement || 'div';

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const reportBack = (event: SliderEvent, update: number) => {
    if (update !== value && onChange) {
      persistEvents && 'persist' in event && event.persist();
      onChange(event, update);
    }
  };

  const getValue = (): number | undefined => (dragging ? dragged : value);

  const ticks = useMemo(
    () =>
      tick
        ? Array(Math.round((max - min) / tick) + 1)
            .fill(null)
            .map((_, index, src) => {
              return (index / (src.length - 1)) * 100;
            })
        : undefined,
    [tick, min, max],
  );

  const calcSnap = (input: number, forceAdjust: number, snapNext?: boolean): number => {
    if (snap) {
      const adjust = input % step;
      const adjusted = adjust / step < 0.5 && !snapNext ? input - adjust : input + (step - adjust);
      if (forceAdjust && adjusted === value) {
        return adjusted + step * forceAdjust;
      }
      return adjusted;
    }
    return input;
  };

  const calcFillFromValue = (value?: number): number => {
    if (value === undefined) return 0;

    const denominator = max - min;
    const dividend = value - min;
    const quotient = (dividend / denominator) * 100;
    return Math.min(Math.max(0, quotient), 100);
  };

  /**
   * If an event was triggered then force adjust the value
   * up or down a step if the snapped value equals the current
   * value.
   */
  const calcValueFromFill = (
    percent: number,
    event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent | React.KeyboardEvent,
    snapNext?: boolean,
  ): number => {
    const diff = percent - calcFillFromValue(value);
    const forceAdjust =
      (event &&
        (event.type === 'mousedown' || event.type === 'touchstart') &&
        ((diff && diff !== Math.abs(diff) ? -1 : 1) || 0)) ||
      0;
    const denominator = max - min;
    const precise = min + (percent * denominator) / 100;
    const rounded = snapNext ? precise : +precise.toFixed(step >= 1 ? 0 : step.toString().split('.')[1].length);
    return calcSnap(rounded, forceAdjust, snapNext);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    reportBack(event, +event.target.value);
  };

  const handleTrackClick: React.MouseEventHandler = event => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((event.nativeEvent.clientX - rect.left) / rect.width) * 100;
    const value = calcValueFromFill(percent, event, snapNext);
    reportBack(event, value);
  };

  const handleDragMove: DraggableProps['onDragMove'] = (event, { position }) => {
    dragging || setDragging(true);
    const percent = (position.x / width) * 100;
    const value = calcValueFromFill(percent, event);
    setDragged(value);
  };

  const handleDragEnd: DraggableProps['onDragEnd'] = (event, { position }) => {
    const percent = (position.x / width) * 100;
    const value = calcValueFromFill(percent, event);
    setDragging(false);
    setDragged(undefined);
    reportBack(event, value);

    // manually focus the slider because it only focuses on click, not immediate drag
    inputRef.current.focus();
  };

  const handleDragStart: DraggableProps['onDragStart'] = useCallback(() => setFocused(true), []);

  const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => !dragging && setFocused(false), [
    dragging,
  ]);

  const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => setFocused(true), []);
  const forwardFocus = useCallback<React.FocusEventHandler<HTMLLabelElement>>(() => inputRef.current?.focus(), []);

  const filledPercent = () => calcFillFromValue(getValue()) || 0;

  const [ref, { width: sliderWidth }] = useDimensions<HTMLLabelElement>({ propsToMeasure: ['width'] });

  return (
    <label
      htmlFor={generateComponentId()}
      className={cx(
        styles.slider,
        accessible && styles['is-accessible'],
        disabled && styles['is-disabled'],
        dragging && styles['is-dragging'],
        focused && styles['is-focused'],
        validity && styles[`is-${validity}`],
        themeId && styles[`slider--${themeId}`],
        color && styles[`slider--${color}`],
        className,
      )}
      style={{ width: propWidth }}
      onFocus={forwardFocus}
      ref={ref}
      tabIndex={focused ? -1 : 0}
      {...props}
    >
      {children && (
        <Label className={styles.sliderValue} contrast={contrast} strength="legend" themeId={themeId}>
          {children}
        </Label>
      )}

      <SliderTrack
        aria-hidden="true"
        className={styles.sliderInputContainer}
        onMouseDown={handleTrackClick}
        ref={containerRef}
        style={{ '--slider-track-fill-width': `${filledPercent()}%` }}
        {...(trackElement && {
          sliderWidth,
        })}
        {...trackProps}
      >
        {Number.isFinite(sliderWidth) && (
          <Draggable
            boundary={{ x: { min: 0, max: sliderWidth } }}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <div className={cx(styles.sliderHandle, scale && styles[`sliderHandle--${scale}`])} />
          </Draggable>
        )}

        {ticks && (
          <div className={styles.sliderTickContainer}>
            {ticks.map((position, i) => {
              const active = position <= calcFillFromValue(getValue());
              return (
                <SliderTick
                  key={position}
                  number={i}
                  className={cx(styles.sliderTick, active && styles['sliderTick--active'])}
                  style={{ left: `${position}%` }}
                  {...(tickElement && {
                    active,
                  })}
                  {...tickProps}
                />
              );
            })}
          </div>
        )}
      </SliderTrack>

      <input
        className={styles.sliderInput}
        disabled={disabled}
        id={generateComponentId()}
        max={max}
        min={min}
        name={name}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={combineRefs}
        step={step}
        tabIndex={-1}
        type="range"
        value={value}
      />

      {valuePosition && (
        <Label
          className={cx(styles.sliderValue, styles[`sliderValue--${valuePosition}`])}
          contrast={contrast}
          noWrap
          strength="standard"
          themeId={themeId}
        >
          {formatValue ? formatValue(getValue()) : getValue()}
        </Label>
      )}
    </label>
  );
}

export const Slider = React.forwardRef(SliderBase);

SliderBase.displayName = 'SliderBase';
Slider.displayName = 'Slider';
