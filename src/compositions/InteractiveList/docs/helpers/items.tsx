import React from 'react';
import { InteractiveGroupItemType } from 'components/InteractiveGroup';
import { Link } from 'components/Link';

export const items = [
  { id: 'red', label: 'Red' },
  { id: 'red-orange', label: 'Red orange' },
  { id: 'orange', label: 'Orange' },
  { id: 'orange-yellow', label: 'Orange yellow' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'yellow-green', label: 'Yellow green', disabled: true },
  { id: 'green', label: 'Green' },
  { id: 'green-blue', label: 'Green blue' },
  { id: 'blue', label: 'Blue' },
  { id: 'blue-indigo', label: 'Blue indigo' },
  { id: 'indigo', label: 'Indigo' },
  { id: 'indigo-violet', label: 'Indigo violet' },
  { id: 'violet', label: 'Violet' },
  { id: 'violet-red', label: 'Violet red' },
] as const;

export const navigationItems = items.map(({ id, label, ...option }: InteractiveGroupItemType<string>) => ({
  id,
  flush: true,
  label: (
    <Link
      block
      unstyled
      unthemed
      href={`#${id}`}
      onClick={event => event.preventDefault()}
      // prevent the link from clicking because it's only here for right clicking
      onKeyDown={event => event.preventDefault()}
      style={{ padding: '8px 16px' }}
      tabIndex={-1}
    >
      {label}
    </Link>
  ),
  ...option,
}));
