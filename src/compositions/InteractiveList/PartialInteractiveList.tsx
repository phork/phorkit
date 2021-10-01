import React, { useRef } from 'react';
import { MergeProps, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { makeCombineRefs } from '../../utils/combineRefs';
import { InteractiveGroupConsumer } from '../../components/InteractiveGroup/InteractiveGroupConsumer';
import {
  PartialInteractiveGroupProvider,
  PartialInteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/PartialInteractiveGroupProvider';
import { List, ListProps } from '../../components/List';
import { InteractiveListItem, InteractiveListItemProps } from './InteractiveListItem';

type ExplicitProviderProps = Pick<
  PartialInteractiveGroupProviderProps<string, HTMLUListElement, HTMLLIElement>,
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

export type LocalPartialInteractiveListProps = ExplicitProviderProps & {
  /** The children element is shown when there are no list elements */
  children: React.ReactNode;
  /** A superficial focus state can be set outside of this component so that focus styles can be applied when, for example, a parent is focused */
  focused?: true;
  listComponent?: typeof List;
  providerProps?: Omit<
    PartialInteractiveGroupProviderProps<string, HTMLUListElement, HTMLLIElement>,
    keyof ExplicitProviderProps | 'children'
  >;
  unstyled?: boolean;
};

export type PartialInteractiveListProps = MergeProps<Omit<ListProps<'ul'>, 'as'>, LocalPartialInteractiveListProps> &
  ThemeProps;

export function PartialInteractiveListBase(
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
  }: PartialInteractiveListProps,
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
    <PartialInteractiveGroupProvider<string, HTMLUListElement, HTMLLIElement>
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
    </PartialInteractiveGroupProvider>
  );
}

/**
 * The interactive list component renders a list that
 * has mouse and keyboard event handlers used to track
 * the selected and focused items(s). It accepts
 * callbacks for when items are selected, unselected,
 * focused, and clicked.
 *
 * This uses the List and the InteractiveGroup
 * components.
 */
export const PartialInteractiveList = React.forwardRef(PartialInteractiveListBase);

// note that the base element cannot have a displayName because it breaks Storybook
PartialInteractiveList.displayName = 'PartialInteractiveList';
