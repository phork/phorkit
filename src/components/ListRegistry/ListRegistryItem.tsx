import React, { useRef } from 'react';
import { useListRegistryItem } from './useListRegistryItem';

export interface ListRegistryItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  children: React.ReactNode;
  id: string;
}

export function ListRegistryItem({
  children: render,
  id,
  ...props
}: ListRegistryItemProps): React.ReactElement<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null!);
  useListRegistryItem({ id, ref });

  return typeof render === 'function' ? (
    render({ ref, ...props })
  ) : (
    <div ref={ref} {...props}>
      {render}
    </div>
  );
}
