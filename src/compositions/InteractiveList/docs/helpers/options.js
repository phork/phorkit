import { Link } from 'components/Link';

export const options = [
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
];

export const navigationOptions = options.map(({ id, label, ...option }) => ({
  id,
  flush: true,
  label: (
    <Link
      block
      unstyled
      unthemed
      href={`#${id}`}
      style={{ padding: '8px 16px' }}
      // prevent the link from clicking because it's only here for right clicking
      onClick={event => event.preventDefault()}
      onKeyDown={event => event.preventDefault()}
      tabIndex={-1}
    >
      {label}
    </Link>
  ),
  ...option,
}));
