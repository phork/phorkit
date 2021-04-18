import React, { useCallback } from 'react';
import { MergeProps } from '../../types/utils';
import { InteractiveGroupItem } from '../../components/InteractiveGroup/InteractiveGroupItem';
import { ListItem, ListItemProps } from '../../components/List';

type StateProps = {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
};

export interface LocalInteractiveListItemProps {
  id: string;
  label: React.ReactNode | ((state: StateProps) => React.ReactNode);
  mimicSelectOnFocus?: boolean;
  onClick: (event: React.MouseEvent | React.TouchEvent, id: LocalInteractiveListItemProps['id']) => void;
}

export type InteractiveListItemProps = Omit<
  MergeProps<ListItemProps<'li'>, LocalInteractiveListItemProps>,
  'as' | 'children'
>;

export function InteractiveListItemBase({
  disabled,
  focused,
  id,
  label,
  mimicSelectOnFocus,
  onClick,
  onKeyDown,
  selected,
  transparent,
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

export const InteractiveListItem = React.memo(InteractiveListItemBase) as typeof InteractiveListItemBase;
InteractiveListItemBase.displayName = 'InteractiveListItemBase';
