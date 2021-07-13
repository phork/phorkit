import { RadioProps } from '../../Radio';

// eslint-disable-next-line no-console
export const logValue: RadioProps['onChange'] = (_event, value) => console.log(value);

export const radioGroup = [
  {
    id: 'radio-group-item1',
    value: 'one',
    label: 'Super fantastic label one',
  },
  {
    id: 'radio-group-item2',
    value: 'two',
    label: 'Super fantastic label two',
  },
  {
    id: 'radio-group-item3',
    value: 'three',
    label: 'Super fantastic label three',
  },
] as const;
