import { CheckboxProps } from '../../Checkbox';

// eslint-disable-next-line no-console
export const logChecked: CheckboxProps['onChange'] = (_event, checked) => console.log(checked);

export const checkboxGroup = [
  {
    id: 'checkbox-group-item1',
    name: 'checkbox-group-item1',
    value: 'one',
    label: 'Super fantastic label one',
  },
  {
    id: 'checkbox-group-item2',
    name: 'checkbox-group-item2',
    value: 'two',
    label: 'Super fantastic label two',
  },
  {
    id: 'checkbox-group-item3',
    name: 'checkbox-group-item3',
    value: 'three',
    label: 'Super fantastic label three',
  },
] as const;
