import React, { useRef } from 'react';
import { MergeProps, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { makeCombineRefs } from '../../utils/combineRefs';
import { InteractiveGroupConsumer } from '../../components/InteractiveGroup/InteractiveGroupConsumer';
import {
  UncontrolledInteractiveGroupProvider,
  UncontrolledInteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/UncontrolledInteractiveGroupProvider';
import { List, ListProps } from '../../components/List';
import { InteractiveListItem, InteractiveListItemProps } from './InteractiveListItem';

type ExplicitProviderProps = Pick<
  UncontrolledInteractiveGroupProviderProps<string, HTMLUListElement, HTMLLIElement>,
  | 'allowReselect'
  | 'disabled'
  | 'maxSelect'
  | 'minSelect'
  | 'onBlur'
  | 'onFocus'
  | 'onItemClick'
  | 'onItemFocus'
  | 'onKeyDown'
  | 'onSelect'
  | 'onSelectionChange'
  | 'onUnselect'
  | 'parentRef'
  | 'reducer'
  | 'selectOnFocus'
  | 'triggerLinks'
>;

export interface LocalUncontrolledInteractiveListProps extends ExplicitProviderProps {
  children: React.ReactNode;
  /** A superficial focus state can be set outside of this component so that focus styles can be applied when, for example, a parent is focused */
  focused?: true;
  listComponent?: typeof List;
  providerProps?: Omit<
    UncontrolledInteractiveGroupProviderProps<string, HTMLUListElement, HTMLLIElement>,
    keyof ExplicitProviderProps | 'children'
  >;
  unstyled?: boolean;
}

export type UncontrolledInteractiveListProps = MergeProps<ListProps<'ul'>, LocalUncontrolledInteractiveListProps> &
  ThemeProps;

function UncontrolledInteractiveListBase(
  {
    allowReselect = false,
    children,
    disabled = false,
    focused,
    listComponent,
    maxSelect,
    mimicSelectOnFocus,
    minSelect,
    onBlur,
    onFocus,
    onItemClick,
    onItemFocus,
    onKeyDown,
    onSelect,
    onSelectionChange,
    onUnselect,
    parentRef,
    providerProps,
    reducer,
    rounded = false,
    selectOnFocus = false,
    themeId: initThemeId,
    transparent = false,
    triggerLinks = false,
    unstyled = false,
    unthemed = false,
    ...props
  }: UncontrolledInteractiveListProps,
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
    <UncontrolledInteractiveGroupProvider<string, HTMLUListElement, HTMLLIElement>
      allowReselect={allowReselect}
      disabled={disabled}
      maxSelect={maxSelect}
      minSelect={minSelect}
      onItemClick={onItemClick}
      onItemFocus={onItemFocus}
      onKeyDown={onKeyDown}
      onSelect={onSelect}
      onSelectionChange={onSelectionChange}
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
              onBlur={onBlur}
              onFocus={onFocus}
              ref={combineRefs}
              rounded={rounded}
              tabIndex={disabled ? -1 : 0}
              themeId={themeId}
              transparent={transparent}
              unstyled={unstyled}
              unthemed={unthemed}
              {...(props as Omit<
                ListProps<'ul'>,
                'as' | 'children' | 'focused' | 'inactive' | 'items' | 'ref' | 'tabIndex' | 'themeId' | 'unstyled'
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
    </UncontrolledInteractiveGroupProvider>
  );
}

export const UncontrolledInteractiveList = React.forwardRef(
  UncontrolledInteractiveListBase,
) as typeof UncontrolledInteractiveListBase;

UncontrolledInteractiveListBase.displayName = 'UncontrolledInteractiveListBase';
UncontrolledInteractiveList.displayName = 'UncontrolledInteractiveList';
