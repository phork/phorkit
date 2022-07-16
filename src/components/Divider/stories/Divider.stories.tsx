import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Divider, DividerProps } from '../Divider';
import DividerDocumentation from './Divider.docs.mdx';

export default {
  title: 'Utilities/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    volume: {
      options: ['quiet', 'quieter', 'quietest', undefined],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
      table: {
        category: 'Uncommon',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    (Story, { args: { orientation } }) => (
      <div style={{ [orientation === 'vertical' ? 'height' : 'width']: 300 }}>{Story()}</div>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: DividerDocumentation,
    },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = args => <Divider {...args} />;

const defaultArgs = {
  contrast: false,
  orientation: 'horizontal' as DividerProps['orientation'],
  unthemed: false,
  variant: 'primary' as DividerProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Divider.test.js'],
};
*/

export const PrimaryVariant = Template.bind({});
PrimaryVariant.storyName = 'Variant: Primary';
PrimaryVariant.args = {
  ...defaultArgs,
  variant: 'primary',
};

export const SecondaryVariant = Template.bind({});
SecondaryVariant.storyName = 'Variant: Secondary';
SecondaryVariant.args = {
  ...defaultArgs,
  variant: 'secondary',
};

export const TertiaryVariant = Template.bind({});
TertiaryVariant.storyName = 'Variant: Tertiary';
TertiaryVariant.args = {
  ...defaultArgs,
  variant: 'tertiary',
};

export const QuietVolume = Template.bind({});
QuietVolume.storyName = 'Volume: Quiet';
QuietVolume.args = {
  ...defaultArgs,
  volume: 'quiet',
};

export const QuieterVolume = Template.bind({});
QuieterVolume.storyName = 'Volume: Quieter';
QuieterVolume.args = {
  ...defaultArgs,
  volume: 'quieter',
};

export const QuietestVolume = Template.bind({});
QuietestVolume.storyName = 'Volume: Quietest';
QuietestVolume.args = {
  ...defaultArgs,
  volume: 'quietest',
};

export const Vertical = Template.bind({});
Vertical.args = {
  ...defaultArgs,
  orientation: 'vertical',
};
