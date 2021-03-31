import React, { useEffect, useRef } from 'react';
import { MergeProps, ThemeProps } from '../../types';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { useThemeId } from '../../hooks/useThemeId';
import { makeCombineRefs } from '../../utils/combineRefs';
import { InteractiveGroupConsumer } from '../../components/InteractiveGroup/InteractiveGroupConsumer';
import {
  InteractiveGroupProvider,
  InteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/InteractiveGroupProvider';
import { List, ListProps } from '../../components/List';
import { InteractiveListItem, InteractiveListItemProps } from './InteractiveListItem';

type ExplicitProviderProps = Pick<
  InteractiveGroupProviderProps<HTMLUListElement, HTMLLIElement>,
  | 'allowMultiSelect'
  | 'allowReselect'
  | 'disableUnselect'
  | 'containerRef'
  | 'disabled'
  | 'initialSelected'
  | 'items'
  | 'onItemFocus'
  | 'onKeyDown'
  | 'onSelect'
  | 'onUnselect'
  | 'selectOnFocus'
>;

export interface LocalInteractiveListProps extends ExplicitProviderProps {
  children: React.ReactNode;
  items: (Omit<InteractiveListItemProps, 'onClick'> & { selectedLabel?: string })[];
  listComponent?: typeof List;
  onBlur?: () => void;
  onFocus?: () => void;
  providerProps?: Omit<
    InteractiveGroupProviderProps<HTMLUListElement, HTMLLIElement>,
    keyof ExplicitProviderProps | 'children'
  >;
  unstyled?: boolean;
}

/**
 * - C is the element type of the container
 */
export type InteractiveListProps = MergeProps<ListProps<'ul'>, LocalInteractiveListProps> & ThemeProps;

function InteractiveListBase(
  {
    allowMultiSelect,
    allowReselect,
    children,
    containerRef,
    disabled,
    disableUnselect,
    initialSelected,
    items,
    listComponent,
    mimicSelectOnFocus,
    onBlur,
    onFocus,
    onItemFocus,
    onKeyDown,
    onSelect,
    onUnselect,
    providerProps,
    rounded,
    selectOnFocus,
    themeId: initThemeId,
    transparent,
    unstyled,
    ...props
  }: InteractiveListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement {
  const ref = useRef<HTMLUListElement>(null!);
  const previous = useRef<{ focused?: boolean }>({});
  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLUListElement>(ref);
  const themeId = useThemeId(initThemeId);

  // this allows the consumer to passed a styled list which can react to accessible, focused, etc.
  const ListComponent = listComponent || List;

  useEffect(() => {
    if (focused !== previous.current.focused && previous.current.focused !== undefined) {
      if (focused) {
        onFocus && onFocus();
      } else {
        onBlur && onBlur();
      }
    }
    previous.current.focused = !!focused;
  }, [focused, onFocus, onBlur]);

  const combineRefs = makeCombineRefs<HTMLUListElement>(ref, forwardedRef);

  return (
    <InteractiveGroupProvider<HTMLUListElement, HTMLLIElement>
      allowMultiSelect={allowMultiSelect}
      allowReselect={allowReselect}
      disableUnselect={disableUnselect}
      containerRef={containerRef}
      disabled={disabled}
      initialSelected={initialSelected}
      items={items}
      onItemFocus={onItemFocus}
      onKeyDown={onKeyDown}
      onSelect={onSelect}
      onUnselect={onUnselect}
      selectOnFocus={selectOnFocus}
      {...providerProps}
    >
      <InteractiveGroupConsumer>
        {({ focusedIndex, handleItemClick, isSelected }) =>
          items && items.length ? (
            <ListComponent<'ul'>
              as="ul"
              focused={focused}
              inactive={disabled}
              mimicSelectOnFocus={mimicSelectOnFocus}
              onBlur={handleBlur}
              onFocus={handleFocus}
              ref={combineRefs}
              rounded={rounded}
              tabIndex={disabled ? -1 : 0}
              themeId={themeId}
              transparent={transparent}
              unstyled={unstyled}
              {...(props as Omit<
                ListProps<'ul'>,
                | 'as'
                | 'children'
                | 'focused'
                | 'inactive'
                | 'items'
                | 'onBlur'
                | 'onFocus'
                | 'ref'
                | 'tabIndex'
                | 'themeId'
                | 'unstyled'
              >)}
            >
              {items.map(({ id, label, disabled, ...itemProps }, index) => {
                return (
                  <InteractiveListItem
                    disabled={disabled}
                    focused={focusedIndex === index}
                    id={id}
                    key={id}
                    label={label}
                    mimicSelectOnFocus={mimicSelectOnFocus}
                    onClick={handleItemClick}
                    selected={isSelected(id)}
                    transparent={transparent}
                    unstyled={unstyled}
                    {...(itemProps as Omit<InteractiveListItemProps, 'id' | 'label' | 'onClick'>)}
                  />
                );
              })}
            </ListComponent>
          ) : (
            children
          )
        }
      </InteractiveGroupConsumer>
    </InteractiveGroupProvider>
  );
}

export const InteractiveList = React.forwardRef(InteractiveListBase) as typeof InteractiveListBase;
