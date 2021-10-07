import React, { useCallback } from 'react';
import { MergeProps } from '../../types/utils';
import { InteractiveGroupItem } from '../../components/InteractiveGroup/InteractiveGroupItem';
import { ListItem, ListItemProps } from '../../components/List';

type StateProps = {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
};

export type LocalInteractiveListItemProps = {
  id: string;
  label: React.ReactNode | ((state: StateProps) => React.ReactNode);
  mimicSelectOnFocus?: boolean;
  onClick: (event: React.MouseEvent | React.TouchEvent, id: LocalInteractiveListItemProps['id']) => void;
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
  selected = false,
  transparent = false,
  ...props
}: InteractiveListItemProps): React.ReactElement {
  const stateProps: StateProps = {
    disabled,
    focused,
    selected,
  };

  const handleClick: ListItemProps['onClick'] = useCallback(
    event => {
      onClick && onClick(event, id);
    },
    [id, onClick],
  );

  return (
    <InteractiveGroupItem<HTMLLIElement> key={id} {...stateProps}>
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
          {typeof label === 'function' ? label(stateProps) : label}
        </ListItem>
      )}
    </InteractiveGroupItem>
  );
}

/**
 * An interactive list item is used in the InteractiveList.
 * It registers the list item and adds the styles for all
 * the different item states.
 *
 * This uses the List and the InteractiveGroup components.
 */
export const InteractiveListItem = React.memo(InteractiveListItemBase);

InteractiveListItemBase.displayName = 'InteractiveListItemBase';
InteractiveListItem.displayName = 'InteractiveListItem';
