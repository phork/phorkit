import { DropdownProps } from '../../Dropdown';

export const options = [
  { id: 'red', value: 'fancy-red', label: 'Red' },
  { id: 'red-orange', value: 'fancy-red-orange', label: 'Red orange' },
  { id: 'orange', label: 'Orange' },
  { id: 'orange-yellow', label: 'Orange yellow' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'yellow-green', label: 'Yellow green' },
  { id: 'green', label: 'Green' },
  { id: 'green-blue', label: 'Green blue' },
  { id: 'blue', label: 'Blue' },
  { id: 'blue-indigo', label: 'Blue indigo' },
  { id: 'indigo', label: 'Indigo' },
  { id: 'indigo-violet', label: 'Indigo violet' },
  { id: 'violet', label: 'Violet' },
  { id: 'violet-red', label: 'Violet red' },
] as const;

// use a timeout to fake loading times and show the spinner
export const handleFilter: DropdownProps['getFilteredOptions'] = value =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(options.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase())));
    }, 1000);
  });

export const handleEmptyFilter: DropdownProps['getFilteredOptions'] = () => new Promise(resolve => resolve([]));
