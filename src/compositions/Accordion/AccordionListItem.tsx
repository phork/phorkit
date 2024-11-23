import { cx } from '@emotion/css';
import React, { useCallback, useContext, useRef } from 'react';
import { useAccessibility } from '../../context/Accessibility';
import { useComponentId } from '../../hooks/useComponentId';
import {
  InteractiveGroupContext,
  InteractiveGroupContextValue,
} from '../../components/InteractiveGroup/InteractiveGroupContext';
import { useInteractiveGroupFocusedIndex } from '../../components/InteractiveGroup/useInteractiveGroupFocusedIndex';
import { useInteractiveGroupSelectedIds } from '../../components/InteractiveGroup/useInteractiveGroupSelectedIds';
import styles from './styles/AccordionList.module.css';
import { AccordionContent, AccordionContentProps } from './AccordionContent';
import { AccordionLabel } from './AccordionLabel';
import { AccordionItemType } from './types';

export type AccordionListItemProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<AccordionContentProps, 'duration' | 'easing' | 'orientation'> &
  AccordionItemType & {
    componentId: string;
    disableScrollIntoView?: boolean;
    flush?: boolean;
    /** The accordion's focus state */
    focused?: boolean;
    index: number;
    onContentFocus?: React.FocusEventHandler<HTMLDivElement>;
    /** The parent ref is used to get its dimensions so the content can be rendered at the right size */
    parentRef: React.RefObject<HTMLDivElement>;
    unstyled?: boolean;
  };

/**
 * The accordion list item renders the accordion label and
 * accordion content for a single accordion item.
 *
 * This uses the `InteractiveGroup` component.
 */
export const AccordionListItem = React.forwardRef<HTMLDivElement, AccordionListItemProps>(
  (
    {
      componentId,
      content,
      contentProps,
      disabled,
      disableScrollIntoView,
      duration,
      easing,
      flush,
      focused,
      iconOnly,
      id,
      index,
      label,
      labelProps,
      onContentFocus,
      orientation,
      parentRef,
      unstyled,
    },
    forwardedRef,
  ): React.ReactElement<AccordionListItemProps> => {
    const accessible = useAccessibility();
    const { generateComponentId } = useComponentId(componentId);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const focusedIndex = useInteractiveGroupFocusedIndex();
    const { isSelected } = useInteractiveGroupSelectedIds();

    const { handleItemClick, setFocused } =
      useContext<InteractiveGroupContextValue<string, HTMLDivElement, HTMLDivElement>>(InteractiveGroupContext);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) =>
        handleItemClick(event, id),
      [handleItemClick, id],
    );

    const handleFocus = useCallback<React.FocusEventHandler<HTMLDivElement>>(
      event => setFocused(id, { event }),
      [id, setFocused],
    );

    const handleKeyDown = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
      event => {
        if (event.key === 'Enter') {
          setFocused(id, { event });
        }
      },
      [id, setFocused],
    );

    const handleContentFocus = useCallback<React.FocusEventHandler<HTMLDivElement>>(
      event => {
        event.stopPropagation();

        setFocused(id, { event });
        onContentFocus?.(event);
      },
      [id, setFocused, onContentFocus],
    );

    const itemFocused = focusedIndex === index;
    const itemSelected = isSelected(id);
    const stateProps = { disabled, focused: focused && itemFocused, selected: itemSelected };

    return (
      <div
        className={cx(
          styles.accordionItem,
          styles[`accordionItem--${orientation}`],
          accessible && styles['is-accessible'],
          itemFocused && styles['is-focused'],
          itemSelected && styles['is-selected'],
        )}
        key={id}
        ref={forwardedRef}
      >
        <AccordionLabel
          aria-controls={generateComponentId(id, 'panel')}
          aria-disabled={disabled}
          aria-expanded={!!stateProps.selected}
          contentRef={contentRef}
          disableScrollIntoView={disableScrollIntoView}
          flush={flush}
          iconOnly={iconOnly}
          id={generateComponentId(id)}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          orientation={orientation}
          role="tab"
          tabIndex={disabled ? -1 : 0}
          unstyled={unstyled}
          {...labelProps}
          {...stateProps}
        >
          {label}
        </AccordionLabel>
        <AccordionContent
          duration={duration}
          easing={easing}
          id={generateComponentId(id, 'panel')}
          // if something within the content gets the focus this prevents the accordion from stealing it
          onFocus={handleContentFocus}
          orientation={orientation}
          parentRef={parentRef}
          ref={contentRef}
          role="tabpanel"
          {...contentProps}
          {...stateProps}
        >
          {typeof content === 'function' ? content(stateProps) : content}
        </AccordionContent>
      </div>
    );
  },
);

AccordionListItem.displayName = 'AccordionListItem';
