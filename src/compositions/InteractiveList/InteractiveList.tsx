import React, { useRef } from 'react';
import { MergeProps, ThemeProps } from '../../types';
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
  | 'disabled'
  | 'initialSelected'
  | 'items'
  | 'onItemClick'
  | 'onItemFocus'
  | 'onKeyDown'
  | 'onSelect'
  | 'onUnselect'
  | 'parentRef'
  | 'selectOnFocus'
  | 'triggerLinks'
>;

export interface LocalInteractiveListProps extends ExplicitProviderProps {
  children: React.ReactNode;
  /** The focused state can be set outside of this component so that focus styles can be applied when, for example, a parent is focused */
  focused?: boolean;
  items: (Omit<InteractiveListItemProps, 'onClick'> & { selectedLabel?: string })[];
  listComponent?: typeof List;
  providerProps?: Omit<
    InteractiveGroupProviderProps<HTMLUListElement, HTMLLIElement>,
    keyof ExplicitProviderProps | 'children'
  >;
  unstyled?: boolean;
}

export type InteractiveListProps = MergeProps<ListProps<'ul'>, LocalInteractiveListProps> & ThemeProps;

function InteractiveListBase(
  {
    allowMultiSelect,
    allowReselect,
    children,
    disabled,
    disableUnselect,
    focused,
    initialSelected,
    items,
    listComponent,
    mimicSelectOnFocus,
    onItemClick,
    onItemFocus,
    onKeyDown,
    onSelect,
    onUnselect,
    parentRef,
    providerProps,
    rounded,
    selectOnFocus,
    themeId: initThemeId,
    transparent,
    triggerLinks,
    unstyled,
    unthemed,
    ...props
  }: InteractiveListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement {
  const ref = useRef<HTMLUListElement>(null!);
  const combineRefs = makeCombineRefs<HTMLUListElement>(ref, forwardedRef);

  const themeId = useThemeId(initThemeId);

  // this allows the consumer to passed a styled list which can react to accessible, focused, etc.
  const ListComponent = listComponent || List;

  return (
    <InteractiveGroupProvider<HTMLUListElement, HTMLLIElement>
      allowMultiSelect={allowMultiSelect}
      allowReselect={allowReselect}
      disabled={disabled}
      disableUnselect={disableUnselect}
      initialSelected={initialSelected}
      items={items}
      onItemClick={onItemClick}
      onItemFocus={onItemFocus}
      onKeyDown={onKeyDown}
      onSelect={onSelect}
      onUnselect={onUnselect}
      parentRef={parentRef}
      selectOnFocus={selectOnFocus}
      triggerLinks={triggerLinks}
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
              ref={combineRefs}
              rounded={rounded}
              tabIndex={disabled ? -1 : 0}
              themeId={themeId}
              transparent={transparent}
              unstyled={unstyled}
              unthemed={unthemed}
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

InteractiveListBase.displayName = 'InteractiveListBase';
InteractiveList.displayName = 'InteractiveList';
