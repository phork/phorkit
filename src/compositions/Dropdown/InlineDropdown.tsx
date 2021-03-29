import React from 'react';
import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownContent } from './DropdownContent';

export function InlineDropdown({ ...props }: Omit<DropdownProps, 'dropdownContent'>) {
  return <Dropdown dropdownContent={DropdownContent} {...props} />;
}
