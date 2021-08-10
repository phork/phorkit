import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from '../../../types';
import { ButtonAlignment, ButtonColor, ButtonShape, ButtonSize, ButtonWeight } from '../types';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { ButtonProps, Button } from '../Button';

export default {
  title: 'Controls/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
    },

    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    color: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral', 'black', 'white'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    shape: {
      options: ['pill', 'brick'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    weight: {
      options: ['solid', 'shaded', 'outlined', 'ghost'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
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

    as: {
      table: {
        category: 'Uncommon controls',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    fullWidth: {
      table: {
        category: 'Uncommon controls',
      },
    },
    imitation: {
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

    loader: {
      control: {
        disable: true,
      },
      table: {
        category: 'Remaining props',
      },
    },
    onClick: {
      control: {
        disable: true,
      },
      table: {
        category: 'Remaining props',
      },
    },

    href: {
      table: {
        category: 'Link controls',
        disable: true,
      },
    },
    target: {
      table: {
        category: 'Link controls',
        disable: true,
      },
    },

    className: {
      table: {
        disable: true,
      },
    },
    themeId: {
      table: {
        disable: true,
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
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ children, size, ...args }) => (
  <Button {...args} loader={<SpinnerIcon scale={size as IconScale} />} onClick={action('clicked')} size={size}>
    {children}
  </Button>
);

const defaultArgs = {
  active: false,
  align: 'center' as ButtonAlignment,
  as: 'button' as ButtonProps['as'],
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
  type: 'button' as ButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as ButtonWeight,
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
  loading: { table: { disable: true } },
  href: { table: { disable: false } },
  target: { table: { disable: false } },
};
