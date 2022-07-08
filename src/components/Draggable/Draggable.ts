import React, { useState, useEffect, useRef, useCallback } from 'react';

type Position = {
  x: number;
  y: number;
};

export type DraggableProps = {
  /** If blocking is true then stop propagation and prevent default are used on the event */
  blocking?: boolean;
  /** An optional boundary for how far the element can be dragged */
  boundary?: {
    x?: { min: number; max: number };
    y?: { min: number; max: number };
  };
  children: React.ReactElement;
  onMouseEnd?: () => void;
  onDragStart?: (event: MouseEvent | TouchEvent) => void;
  onDragEnd?: (event: MouseEvent | TouchEvent, { position }: { position: Position }) => void;
  onDragMove?: (
    event: MouseEvent | TouchEvent,
    { position, relative }: { position: Position; relative?: Partial<Position> },
  ) => void;
  paused?: boolean;
  touchOnly?: boolean;
};

/**
 * A draggable component can be dragged by a mouse or
 * touch event with callback functions for when the
 * drag starts, moves and ends. It can also have an
 * optional boundary which it cannot be dragged past.
 */
export function Draggable<E extends HTMLElement = HTMLDivElement>({
  blocking: initBlocking = false,
  boundary,
  children,
  onDragEnd,
  onDragMove,
  onDragStart,
  paused = false,
  touchOnly = false,
}: DraggableProps): JSX.Element {
  const blocking = (initBlocking === undefined && true) || initBlocking;
  const [dragging, setDragging] = useState<boolean>(false);
  const [relative, setRelative] = useState<Partial<Position> | undefined>();
  const lastPosition = useRef<Position>();
  const ref = useRef<E>(null);

  const clampPosition = useCallback(
    (position: Position): Position => {
      if (boundary?.x) {
        if (Number.isFinite(boundary.x.min)) {
          position.x = Math.max(position.x, boundary.x.min);
        }
        if (Number.isFinite(boundary.x.max)) {
          position.x = Math.min(position.x, boundary.x.max);
        }
      }
      if (boundary?.y) {
        if (Number.isFinite(boundary.y.min)) {
          position.y = Math.max(position.y, boundary.y.min);
        }
        if (Number.isFinite(boundary.y.max)) {
          position.y = Math.min(position.y, boundary.y.max);
        }
      }
      return position;
    },
    [boundary?.x, boundary?.y],
  );

  const calcPosition = useCallback(
    ({ pageX, pageY }: { pageX: number; pageY: number }): Position => {
      const position = clampPosition({
        x: relative?.x ? pageX - relative.x : pageX,
        y: relative?.y ? pageY - relative.y : pageY,
      });

      lastPosition.current = position;
      return position;
    },
    [clampPosition, relative],
  );

  // calculate relative position to the mouse and set dragging to true
  const handleMouseDown = useCallback(
    (event: MouseEvent): void => {
      if (!ref.current) throw new Error('Missing ref');

      if (event.button === 0) {
        setDragging(true);
        setRelative({
          x: event.pageX - ref.current.offsetLeft,
          y: event.pageY - ref.current.offsetTop,
        });

        onDragStart && onDragStart(event);

        if (blocking) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    },
    [blocking, onDragStart],
  );

  // clear the position when finished to hand positioning back to the parent
  const handleMouseUp = useCallback(
    (event: MouseEvent): void => {
      setDragging(false);

      const position = calcPosition(event);
      onDragEnd && onDragEnd(event, { position });

      setRelative(undefined);

      if (blocking) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    [calcPosition, onDragEnd, blocking],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent): void => {
      if (dragging) {
        const position = calcPosition(event);
        onDragMove && onDragMove(event, { position, relative });

        if (blocking) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    },
    [dragging, calcPosition, onDragMove, relative, blocking],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent): void => {
      if (!ref.current) throw new Error('Missing ref');

      if (event.touches.length === 1) {
        setDragging(true);
        setRelative({
          x: event.touches[0].pageX - ref.current.offsetLeft,
          y: event.touches[0].pageY - ref.current.offsetTop,
        });

        onDragStart && onDragStart(event);
      }
    },
    [onDragStart],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent): void => {
      setDragging(false);

      // touchend events don't include coords so use the last position here
      const position = lastPosition.current;
      if (position) {
        onDragEnd && onDragEnd(event, { position });
      }

      setRelative(undefined);
    },
    [onDragEnd],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (dragging) {
        const position = calcPosition(event.touches[0]);
        onDragMove && onDragMove(event, { position, relative });
      }

      if (blocking) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    },
    [dragging, blocking, calcPosition, onDragMove, relative],
  );

  // mouse event handling
  useEffect((): (() => void) | undefined => {
    if (dragging) {
      if (typeof document !== 'undefined') {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
        if (typeof document !== 'undefined') {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        }
      };
    }
    return undefined;
  }, [dragging, handleMouseMove, handleMouseUp]);

  // touch event handling
  useEffect((): (() => void) | undefined => {
    if (dragging) {
      if (typeof document !== 'undefined') {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
      }
      return () => {
        if (typeof document !== 'undefined') {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        }
      };
    }
    return undefined;
  }, [dragging, handleTouchMove, handleTouchEnd]);

  return paused
    ? children
    : React.cloneElement(children, {
        onMouseDown: touchOnly ? undefined : handleMouseDown,
        onTouchStart: handleTouchStart,
        ref,
      });
}

Draggable.displayName = 'Draggable';
