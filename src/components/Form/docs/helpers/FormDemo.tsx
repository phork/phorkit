import React, { useRef } from 'react';
import { useForm, UseFormResponse } from './useForm';

const options = [
  { id: 'red', value: 'red', label: 'Red' },
  { id: 'orange', value: 'orange', label: 'Orange' },
  { id: 'yellow', value: 'yellow', label: 'Yellow' },
  { id: 'green', value: 'green', label: 'Green' },
  { id: 'blue', value: 'blue', label: 'Blue' },
  { id: 'indigo', value: 'indigo', label: 'Indigo' },
  { id: 'violet', value: 'violet', label: 'Violet' },
];

const initialValues = {
  checkbox: true,
  checkboxes: ['one'],
  danger: '',
  dropdown: [] as string[],
  dropdownContained: [] as string[],
  password: '123456',
  radio: 'one',
  radios: 'one',
  search: '',
  selectAnotherColor: 'Yellow',
  selectColor: '',
  slider: 40,
  stepper1: 13,
  stepper2: 42,
  success: '',
  textarea:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit nibh a ante accumsan, non euismod tellus maximus. Aliquam interdum faucibus metus id tincidunt. Donec nec justo vel purus feugiat mollis. Integer ut quam et eros egestas laoreet non nec nisi. Nunc at ligula tincidunt odio condimentum facilisis id in odio. Ut eget quam magna. Maecenas semper sagittis velit, non aliquet enim tempor sagittis. Cras eget quam sit amet nisl consectetur vulputate eu quis urna. Aliquam eu congue enim. Integer commodo lobortis dolor. Nunc tempor, eros nec imperdiet tempor, eros augue faucibus magna, eget vestibulum turpis sapien non elit.',
  toggle: false,
  username: 'phork',
  warning: '',
};

type FormDemoValues = {
  checkbox?: boolean;
  checkboxes?: string[];
  danger?: string;
  dropdown?: string[];
  dropdownContained?: string[];
  password?: string;
  radio?: string;
  radios?: string;
  search?: string;
  selectAnotherColor?: string;
  selectColor?: string;
  slider?: number;
  stepper1?: number;
  stepper2?: number;
  success?: string;
  textarea?: string;
  toggle?: boolean;
  username?: string;
  warning?: string;
};

type FormDemoRefs = {
  username?: HTMLInputElement | null;
  password?: HTMLInputElement | null;
  search?: HTMLInputElement | null;
  success?: HTMLInputElement | null;
  warning?: HTMLInputElement | null;
  danger?: HTMLInputElement | null;
  selectColor?: HTMLSelectElement | null;
  selectAnotherColor?: HTMLSelectElement | null;
  dropdown?: HTMLDivElement | null;
  dropdownContained?: HTMLDivElement | null;
  textarea?: HTMLTextAreaElement | null;
  checkbox?: HTMLInputElement | null;
  radio1?: HTMLInputElement | null;
  radio2?: HTMLInputElement | null;
  stepper1?: HTMLInputElement | null;
  stepper2?: HTMLInputElement | null;
  checkboxes1?: HTMLInputElement | null;
  checkboxes2?: HTMLInputElement | null;
  checkboxes3?: HTMLInputElement | null;
  radios1?: HTMLInputElement | null;
  radios2?: HTMLInputElement | null;
  radios3?: HTMLInputElement | null;
  slider?: HTMLInputElement | null;
  toggle?: HTMLInputElement | null;
};

type FormDemoChildrenProps = Omit<UseFormResponse<FormDemoValues>, 'handleSubmit'> & {
  contrast?: boolean;
  options: typeof options;
  persistEvents: boolean;
  refs: React.RefObject<FormDemoRefs>;
};

type FormDemoProps = {
  children: (props: FormDemoChildrenProps) => React.ReactChild | React.ReactFragment;
  contrast?: boolean;
  style?: React.CSSProperties;
};

export function FormDemo({ children, contrast = false, style }: FormDemoProps): JSX.Element {
  const refs = useRef<FormDemoRefs>({});

  const { values, setValues, handleChange, handleSubmit } = useForm<FormDemoValues>(() => {
    /* eslint-disable-next-line */
    console.log(values);
  }, initialValues);

  return (
    <form onSubmit={handleSubmit} style={style}>
      {children({
        contrast,
        handleChange,
        options,
        persistEvents: true,
        refs,
        setValues,
        values,
      })}
    </form>
  );
}
