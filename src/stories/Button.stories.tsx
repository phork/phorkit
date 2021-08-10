import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../types';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { ButtonProps, Button } from '../components/Button/Button';
import { ButtonAlignment, ButtonColor, ButtonShape, ButtonSize } from '../components/Button/types';

export default {
  title: 'Controls/Button',
  component: Button,
  argTypes: {
    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },
    color: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral', 'black', 'white'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    shape: {
      options: ['pill', 'brick'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },
    weight: {
      options: ['solid', 'shaded', 'outlined', 'ghost'],
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },

    active: {
      table: {
        category: 'State controls',
      },
    },
    disabled: {
      table: {
        category: 'State controls',
      },
    },
    focused: {
      table: {
        category: 'State controls',
      },
    },
    loading: {
      table: {
        category: 'State controls',
      },
    },

    fullWidth: {
      table: {
        category: 'Uncommon controls',
      },
    },
    noHeight: {
      table: {
        category: 'Uncommon controls',
      },
    },
    noPadding: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unstyled: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      description: {
        component: 'The primary component for clickable interactions.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<(args: ButtonProps) => React.ReactElement>;

const Template: ComponentStory<(args: ButtonProps) => React.ReactElement> = ({ children, size, ...args }) => (
  <Button {...args} loader={<SpinnerIcon scale={size as IconScale} />} onClick={action('clicked')} size={size}>
    {children}
  </Button>
);

const defaultArgs = {
  active: false,
  align: 'center' as ButtonAlignment,
  children: 'Click me',
  color: 'primary' as ButtonColor,
  disabled: false,
  focused: false,
  fullWidth: false,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'pill' as ButtonShape,
  size: 'medium' as ButtonSize,
  unstyled: false,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Solid = Template.bind({});
Solid.args = {
  ...defaultArgs,
  weight: 'solid',
};

export const Shaded = Template.bind({});
Shaded.args = {
  ...defaultArgs,
  weight: 'shaded',
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...defaultArgs,
  weight: 'outlined',
};

export const Ghost = Template.bind({});
Ghost.args = {
  ...defaultArgs,
  weight: 'ghost',
};

export const Link = (args: ButtonProps<'a'>) => <Button<'a'> as="a" {...args} />;
Link.args = {
  ...defaultArgs,
  href: 'https://phorkit.phork.org',
  target: '_blank',
};

Link.argTypes = {
  loading: { control: { disable: true } },
};
