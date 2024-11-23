import React, { useRef } from 'react';
import { MergeProps, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { makeCombineRefs } from '../../utils/combineRefs';
import {
  PartialInteractiveGroupProvider,
  PartialInteractiveGroupProviderProps,
} from '../../components/InteractiveGroup/PartialInteractiveGroupProvider';
import { List, ListProps } from '../../components/List';
import { InteractiveListItemProps, InteractiveListItemStateProps } from './InteractiveListItem';
import { PartialInteractiveListItems } from './PartialInteractiveListItems';

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
  children: NonNullable<React.ReactNode>;
  /** A superficial focus state can be set outside of this component so that focus styles can be applied when, for example, a parent is focused */
  focused?: boolean;
  listComponent?: typeof List;
  providerProps?: Omit<
    PartialInteractiveGroupProviderProps<string, HTMLUListElement, HTMLLIElement>,
    keyof ExplicitProviderProps | 'children'
  >;
  renderLabel?: (label: React.ReactNode, state: InteractiveListItemStateProps) => React.ReactElement;
  scrollBehavior?: InteractiveListItemProps['scrollBehavior'];
  unstyled?: boolean;
};

export type PartialInteractiveListProps = MergeProps<
  Omit<ListProps<'ul'>, 'as' | 'items'>,
  LocalPartialInteractiveListProps
> &
  ThemeProps;

export function PartialInteractiveListBase(
  {
    allowReselect = false,
    children,
    disabled = false,
    focused: superficialFocused,
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
    renderLabel,
    rounded = false,
    scrollBehavior,
    selectOnFocus = false,
    themeId: initThemeId,
    transparent = false,
    triggerLinks = false,
    unstyled = false,
    unthemed = false,
    variant = 'bordered',
    ...props
  }: PartialInteractiveListProps,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement {
  const ref = useRef<HTMLUListElement>(null);
  const combineRefs = makeCombineRefs<HTMLUListElement>(ref, forwardedRef);

  const [state] = reducer;
  const items = state.items.getAll();

  const themeId = useThemeId(initThemeId);
  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLUListElement>(ref);

  // this allows the consumer to passed a styled list which can react to accessible, focused, etc.
  const ListComponent = listComponent || List;

  return (
    <PartialInteractiveGroupProvider<string, HTMLUListElement, HTMLLIElement>
      allowReselect={allowReselect}
      disabled={disabled}
      maxSelect={maxSelect}
      minSelect={minSelect}
      onBlur={handleBlur}
      onFocus={handleFocus}
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
      {items && items.length ? (
        <ListComponent<'ul'>
          as="ul"
          focused={focused || superficialFocused}
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
          variant={variant}
          {...(props as Omit<
            ListProps<'ul'>,
            'as' | 'children' | 'focused' | 'inactive' | 'items' | 'ref' | 'tabIndex' | 'themeId' | 'unstyled'
          >)}
        >
          <PartialInteractiveListItems
            focused={focused}
            items={items}
            mimicSelectOnFocus={mimicSelectOnFocus}
            renderLabel={renderLabel}
            scrollBehavior={scrollBehavior}
            transparent={transparent}
            unstyled={unstyled}
          />
        </ListComponent>
      ) : (
        children
      )}
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
 * This uses the `List` and `InteractiveGroup` components.
 */
export const PartialInteractiveList = React.forwardRef(PartialInteractiveListBase);

// note that the base element cannot have a displayName because it breaks Storybook
PartialInteractiveList.displayName = 'PartialInteractiveList';
