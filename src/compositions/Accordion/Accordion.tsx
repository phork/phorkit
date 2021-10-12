import React, { useState } from 'react';
import { ThemeProps } from '../../types';
import { useComponentId } from '../../hooks/useComponentId';
import {
  InteractiveGroupProvider,
  InteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/InteractiveGroupProvider';
import { ListRegistryProvider } from '../../components/ListRegistry/ListRegistryProvider';
import { AccordionContainer } from './AccordionContainer';
import { AccordionList, AccordionListProps } from './AccordionList';

export type AccordionRenderChildren = (
  props: Pick<
    AccordionProps,
    'className' | 'contrast' | 'horizontal' | 'items' | 'style' | 'themeId' | 'variant' | 'unstyled'
  > & {
    componentId: string;
    ref: React.Ref<HTMLElement>;
  },
) => React.ReactElement<HTMLDivElement>;

export type AccordionProps = Pick<
  InteractiveGroupProviderProps,
  'maxSelect' | 'minSelect' | 'initialSelected' | 'onSelect'
> &
  Pick<AccordionListProps, 'duration' | 'easing' | 'horizontal' | 'items' | 'variant'> &
  ThemeProps & {
    children?: AccordionRenderChildren;
    className?: string;
    listProps?: Omit<
      AccordionListProps,
      | 'componentId'
      | 'contrast'
      | 'duration'
      | 'easting'
      | 'horizontal'
      | 'items'
      | 'onBlur'
      | 'onFocus'
      | 'ref'
      | 'themeId'
      | 'unstyled'
      | 'variant'
    >;
    style?: React.CSSProperties;
    unstyled?: boolean;
  };

/**
 * An accordion is a collection of items that each have
 * a title and some content. The content can be expanded
 * or collapsed. When multiple items aren't allowed to be
 * open, expanding one item will collapse the previously
 * expanded one.
 *
 * The `initialSelected` prop can be used to set up which
 * content is shown on load, but after that the state is
 * stored internally. The `onSelect` callback can be used
 * by the parent, if necessary.
 *
 * Keyboard navigation is available for this component.
 * Navigate with `Up`, `Down`, `Left`, `Right`, `Home`
 * or `End`. Toggle with `Space`. Select with `Enter`.
 *
 * This uses the `InteractiveGroup` and the `ListRegistry`
 * components.
 */
export function Accordion({
  children,
  className,
  contrast = false,
  duration,
  easing,
  horizontal = false,
  initialSelected,
  items,
  listProps,
  maxSelect,
  minSelect,
  onSelect,
  style,
  themeId,
  unstyled = false,
  variant: initVariant = 'primary',
  ...props
}: AccordionProps): React.ReactElement {
  const { componentId } = useComponentId();
  const [focused, setFocused] = useState<boolean>(false);
  const variant = unstyled ? undefined : initVariant;

  const handleBlur = () => setFocused(false);
  const handleFocus = () => setFocused(true);

  return (
    <ListRegistryProvider<HTMLDivElement>>
      <InteractiveGroupProvider<string, HTMLDivElement, HTMLDivElement>
        initialSelected={initialSelected || (items[0] && [items[0].id])}
        items={items}
        maxSelect={maxSelect}
        minSelect={minSelect}
        onSelect={onSelect}
        {...props}
      >
        {
          ref =>
            /* eslint-disable react/jsx-indent */
            typeof children === 'function' ? (
              children({
                className,
                componentId,
                contrast,
                horizontal,
                items,
                ref,
                style,
                themeId,
                variant,
                unstyled,
              })
            ) : (
              <AccordionContainer
                className={className}
                contrast={contrast}
                focused={focused}
                horizontal={horizontal}
                style={style}
                variant={variant}
              >
                <AccordionList
                  componentId={componentId}
                  contrast={contrast}
                  duration={duration}
                  easing={easing}
                  horizontal={horizontal}
                  items={items}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  ref={ref}
                  themeId={themeId}
                  unstyled={unstyled}
                  variant={variant}
                  {...listProps}
                />
              </AccordionContainer>
            )
          /* eslint-enable react/jsx-indent */
        }
      </InteractiveGroupProvider>
    </ListRegistryProvider>
  );
}

Accordion.displayName = 'Accordion';
