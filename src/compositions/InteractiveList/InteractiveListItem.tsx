import React, { useCallback } from 'react';
import { MergeProps } from '../../types/utils';
import {
  InteractiveGroupItem,
  InteractiveGroupItemProps,
} from '../../components/InteractiveGroup/InteractiveGroupItem';
import { ListItem, ListItemProps } from '../../components/List';

export type InteractiveListItemStateProps = {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
};

export type LocalInteractiveListItemProps = {
  id: string;
  label: React.ReactNode | ((state: InteractiveListItemStateProps) => React.ReactNode);
  mimicSelectOnFocus?: boolean;
  onClick: (event: React.MouseEvent | React.TouchEvent, id: LocalInteractiveListItemProps['id']) => void;
  renderLabel?: (label: React.ReactNode, state: InteractiveListItemStateProps) => React.ReactElement;
  scrollBehavior?: InteractiveGroupItemProps<HTMLLIElement>['scrollBehavior'];
};

export type InteractiveListItemProps = Omit<
  MergeProps<ListItemProps<'li'>, LocalInteractiveListItemProps>,
  'as' | 'children'
>;

export function InteractiveListItemBase({
  disabled = false,
  focused = false,
  id,
  label,
  mimicSelectOnFocus = false,
  onClick,
  onKeyDown,
  renderLabel,
  scrollBehavior,
  selected = false,
  transparent = false,
  ...props
}: InteractiveListItemProps): JSX.Element {
  const stateProps: InteractiveListItemStateProps = {
    disabled,
    focused,
    selected,
  };

  const handleClick: ListItemProps['onClick'] = useCallback(
    event => {
      onClick?.(event, id);
    },
    [id, onClick],
  );

  return (
    <InteractiveGroupItem<HTMLLIElement> key={id} scrollBehavior={scrollBehavior} {...stateProps}>
      {ref => (
        <ListItem
          as="li"
          mimicSelectOnFocus={mimicSelectOnFocus}
          onClick={handleClick}
          ref={ref}
          tabIndex={-1}
          transparent={transparent}
          {...(props as Omit<
            InteractiveListItemProps,
            'as' | 'children' | 'disabled' | 'focused' | 'selected' | 'onClick' | 'ref' | 'tabIndex' | 'transparent'
          >)}
          {...stateProps}
        >
          {(typeof label === 'function' && label(stateProps)) ||
            (renderLabel && renderLabel(label, stateProps)) ||
            label}
        </ListItem>
      )}
    </InteractiveGroupItem>
  );
}

/**
 * An interactive list item is used in the `InteractiveList`.
 * It registers the list item and adds the styles for all
 * the different item states.
 *
 * This uses the `List` and the `InteractiveGroup` components.
 */
export const InteractiveListItem = React.memo(InteractiveListItemBase);

// note that the base element cannot have a displayName because it breaks Storybook
InteractiveListItem.displayName = 'InteractiveListItem';
