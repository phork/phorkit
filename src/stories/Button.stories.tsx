import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ButtonProps, Button } from '../components/Button/Button';

export default {
  title: 'Controls/Button',
  component: Button,
  argTypes: {
    color: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral', 'black', 'white'],
      control: { type: 'select' },
    },
    shape: {
      options: ['pill', 'brick'],
      control: { type: 'radio' },
    },
    weight: {
      options: ['solid', 'shaded', 'outlined', 'ghost'],
      control: { type: 'radio' },
    },
  },
  parameters: { controls: { sort: 'requiredFirst' } },
} as ComponentMeta<(args: ButtonProps) => React.ReactElement>;

const Template: ComponentStory<(args: ButtonProps) => React.ReactElement> = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
);

export const Solid = Template.bind({});
Solid.args = {
  children: 'Click me',
  color: 'primary',
  shape: 'pill',
  weight: 'solid',
};

export const Shaded = Template.bind({});
Shaded.args = {
  children: 'Click me',
  color: 'primary',
  shape: 'pill',
  weight: 'shaded',
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: 'Click me',
  color: 'primary',
  shape: 'pill',
  weight: 'outlined',
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: 'Click me',
  color: 'primary',
  shape: 'pill',
  weight: 'ghost',
};
