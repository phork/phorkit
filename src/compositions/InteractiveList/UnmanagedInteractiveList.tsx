import React, { useRef } from 'react';
import { MergeProps, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { makeCombineRefs } from '../../utils/combineRefs';
import { InteractiveGroupConsumer } from '../../components/InteractiveGroup/InteractiveGroupConsumer';
import {
  UnmanagedInteractiveGroupProvider,
  UnmanagedInteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/UnmanagedInteractiveGroupProvider';
import { List, ListProps } from '../../components/List';
import { InteractiveListItem, InteractiveListItemProps } from './InteractiveListItem';

type ExplicitProviderProps = Pick<
  UnmanagedInteractiveGroupProviderProps<string, HTMLUListElement, HTMLLIElement>,
  | 'allowReselect'
  | 'disabled'
  | 'maxSelect'
  | 'minSelect'
  | 'onItemClick'
  | 'onItemFocus'
  | 'onKeyDown'
  | 'onSelect'
  | 'onUnselect'
  | 'parentRef'
  | 'reducer'
  | 'selectOnFocus'
  | 'triggerLinks'
>;

export interface LocalUnmanagedInteractiveListProps extends ExplicitProviderProps {
  children: React.ReactNode;
  /** The focused state can be set outside of this component so that focus styles can be applied when, for example, a parent is focused */
  focused?: boolean;
  listComponent?: typeof List;
  providerProps?: Omit<
    UnmanagedInteractiveGroupProviderProps<string, HTMLUListElement, HTMLLIElement>,
    keyof ExplicitProviderProps | 'children'
  >;
  unstyled?: boolean;
}

export type UnmanagedInteractiveListProps = MergeProps<ListProps<'ul'>, LocalUnmanagedInteractiveListProps> &
  ThemeProps;

function UnmanagedInteractiveListBase(
  {
    allowReselect,
    children,
    disabled,
    focused,
    listComponent,
    maxSelect,
    mimicSelectOnFocus,
    minSelect,
    onItemClick,
    onItemFocus,
    onKeyDown,
    onSelect,
    onUnselect,
    parentRef,
    providerProps,
    reducer,
    rounded,
    selectOnFocus,
    themeId: initThemeId,
    transparent,
    triggerLinks,
    unstyled,
    unthemed,
    ...props
  }: UnmanagedInteractiveListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement {
  const ref = useRef<HTMLUListElement>(null!);
  const combineRefs = makeCombineRefs<HTMLUListElement>(ref, forwardedRef);

  const [state] = reducer;
  const items = state.items.getAll();

  const themeId = useThemeId(initThemeId);

  // this allows the consumer to passed a styled list which can react to accessible, focused, etc.
  const ListComponent = listComponent || List;

  return (
    <UnmanagedInteractiveGroupProvider<string, HTMLUListElement, HTMLLIElement>
      allowReselect={allowReselect}
      disabled={disabled}
      maxSelect={maxSelect}
      minSelect={minSelect}
      onItemClick={onItemClick}
      onItemFocus={onItemFocus}
      onKeyDown={onKeyDown}
      onSelect={onSelect}
      onUnselect={onUnselect}
      parentRef={parentRef}
      reducer={reducer}
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
    </UnmanagedInteractiveGroupProvider>
  );
}

export const UnmanagedInteractiveList = React.forwardRef(
  UnmanagedInteractiveListBase,
) as typeof UnmanagedInteractiveListBase;

UnmanagedInteractiveListBase.displayName = 'UnmanagedInteractiveListBase';
UnmanagedInteractiveList.displayName = 'UnmanagedInteractiveList';
