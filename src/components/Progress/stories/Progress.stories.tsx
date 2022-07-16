import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Progress, ProgressProps } from '../Progress';
import ProgressDocumentation from './Progress.docs.mdx';

export default {
  title: 'Feedback/Progress',
  component: Progress,
  argTypes: {
    animated: {
      table: {
        category: 'Appearance',
      },
    },
    color: {
      table: {
        category: 'Appearance',
      },
    },
    floating: {
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
      table: {
        category: 'Appearance',
      },
    },
    spaced: {
      table: {
        category: 'Appearance',
      },
    },
    volume: {
      options: ['quiet', 'quieter', 'quietest', undefined],
      table: {
        category: 'Appearance',
      },
    },

    data: {
      table: {
        category: 'State',
      },
    },
    percent: {
      control: {
        type: 'number',
      },
      table: {
        category: 'State',
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
      page: ProgressDocumentation,
    },
  },
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = args => <Progress {...args} />;

const defaultArgs = {
  animated: false,
  color: 'primary' as ProgressProps['color'],
  contrast: false,
  floating: false,
  orientation: 'horizontal' as ProgressProps['orientation'],
  percent: 60,
  rounded: false,
  size: 'medium' as ProgressProps['size'],
  spaced: false,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Progress.test.js'],
};
*/

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
};

export const SuccessColor = Template.bind({});
SuccessColor.storyName = 'Color: Success';
SuccessColor.args = {
  ...defaultArgs,
  color: 'success',
};

export const WarningColor = Template.bind({});
WarningColor.storyName = 'Color: Warning';
WarningColor.args = {
  ...defaultArgs,
  color: 'warning',
};

export const DangerColor = Template.bind({});
DangerColor.storyName = 'Color: Danger';
DangerColor.args = {
  ...defaultArgs,
  color: 'danger',
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  size: 'small',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  size: 'medium',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  size: 'large',
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

export const HorizontalOrientation = Template.bind({});
HorizontalOrientation.storyName = 'Orientation: Horizontal';
HorizontalOrientation.args = {
  ...defaultArgs,
  orientation: 'horizontal',
};

export const VerticalOrientation = Template.bind({});
VerticalOrientation.storyName = 'Orientation: Vertical';
VerticalOrientation.args = {
  ...defaultArgs,
  orientation: 'vertical',
};

export const Floating = Template.bind({});
Floating.args = {
  ...defaultArgs,
  floating: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
  ...defaultArgs,
  rounded: true,
  size: 'large',
};

export const Animated = Template.bind({});
Animated.args = {
  ...defaultArgs,
  animated: true,
  rounded: true,
  size: 'large',
};

export const Segmented = Template.bind({});
Segmented.args = {
  ...defaultArgs,
  data: [
    { color: 'danger', percent: 10 },
    { color: 'warning', percent: 20 },
    { color: 'success', percent: 40 },
  ],
  percent: undefined,
  spaced: true,
};
