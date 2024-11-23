import React, { Fragment, useContext } from 'react';
import { InteractiveGroupContext } from '../../components/InteractiveGroup/InteractiveGroupContext';
import { PartialInteractiveGroupProviderProps } from '../../components/InteractiveGroup/PartialInteractiveGroupProvider';
import { InteractiveGroupItemType } from '../../components/InteractiveGroup/types';
import { useInteractiveGroupFocusedIndex } from '../../components/InteractiveGroup/useInteractiveGroupFocusedIndex';
import { useInteractiveGroupSelectedIds } from '../../components/InteractiveGroup/useInteractiveGroupSelectedIds';
import { List } from '../../components/List';
import { InteractiveListItem, InteractiveListItemProps, InteractiveListItemStateProps } from './InteractiveListItem';

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

export type PartialInteractiveListItemsProps = {
  focused: boolean;
  items: readonly InteractiveGroupItemType<string>[];
  mimicSelectOnFocus?: boolean;
  renderLabel?: (label: React.ReactNode, state: InteractiveListItemStateProps) => React.ReactElement;
  scrollBehavior?: InteractiveListItemProps['scrollBehavior'];
  transparent?: boolean;
  unstyled?: boolean;
};

export function PartialInteractiveListItems({
  focused,
  items,
  mimicSelectOnFocus,
  renderLabel,
  scrollBehavior,
  transparent = false,
  unstyled = false,
}: PartialInteractiveListItemsProps): React.ReactElement {
  const focusedIndex = useInteractiveGroupFocusedIndex();
  const { isSelected } = useInteractiveGroupSelectedIds();
  const { handleItemClick } = useContext(InteractiveGroupContext);

  return (
    <Fragment>
      {items.map(({ id, label, disabled, ...itemProps }, index) => {
        const itemFocused = focusedIndex === index;
        const itemSelected = isSelected(id);
        const stateProps = {
          disabled,
          focused: (focused || mimicSelectOnFocus) && itemFocused,
          selected: itemSelected,
        };

        return (
          <InteractiveListItem
            id={id}
            key={id}
            label={label}
            mimicSelectOnFocus={mimicSelectOnFocus}
            onClick={handleItemClick}
            renderLabel={renderLabel}
            scrollBehavior={scrollBehavior}
            transparent={transparent}
            unstyled={unstyled}
            {...stateProps}
            {...(itemProps as Omit<InteractiveListItemProps, 'id' | 'label' | 'onClick' | 'renderLabel'>)}
          />
        );
      })}
    </Fragment>
  );
}

PartialInteractiveListItems.displayName = 'PartialInteractiveListItems';
