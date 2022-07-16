import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Flex } from 'components/Flex';
import { Typography } from 'components/Typography';
import { Loader, LoaderProps } from '../Loader';
import LoaderDocumentation from './Loader.docs.mdx';

export default {
  title: 'Feedback/Loader',
  component: Loader,
  argTypes: {
    position: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    scale: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: {
        type: 'number',
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
  decorators: [Story => <div style={{ position: 'relative', minHeight: 64 }}>{Story()}</div>],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: LoaderDocumentation,
    },
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = args => <Loader {...args} />;

const defaultArgs = {
  contrast: false,
  position: 'relative' as LoaderProps['position'],
  size: 60,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Loader.test.js'],
};
*/

export const SmallScale = Template.bind({});
SmallScale.storyName = 'Scale: Small';
SmallScale.args = {
  ...defaultArgs,
  scale: 'small',
};

export const MediumScale = Template.bind({});
MediumScale.storyName = 'Scale: Medium';
MediumScale.args = {
  ...defaultArgs,
  scale: 'medium',
};

export const LargeScale = Template.bind({});
LargeScale.storyName = 'Scale: Large';
LargeScale.args = {
  ...defaultArgs,
  scale: 'large',
};

export const XLargeScale = Template.bind({});
XLargeScale.storyName = 'Scale: XLarge';
XLargeScale.args = {
  ...defaultArgs,
  scale: 'xlarge',
};

export const XXLargeScale = Template.bind({});
XXLargeScale.storyName = 'Scale: 2XLarge';
XXLargeScale.args = {
  ...defaultArgs,
  scale: '2xlarge',
};

export const XXXLargeScale = Template.bind({});
XXXLargeScale.storyName = 'Scale: 3XLarge';
XXXLargeScale.args = {
  ...defaultArgs,
  scale: '3xlarge',
};

export const RelativePosition = Template.bind({});
RelativePosition.storyName = 'Position: Relative';
RelativePosition.args = {
  ...defaultArgs,
  position: 'relative',
};

export const AbsolutePosition = Template.bind({});
AbsolutePosition.storyName = 'Position: Absolute';
AbsolutePosition.args = {
  ...defaultArgs,
  position: 'absolute',
};

export const FixedPosition = Template.bind({});
FixedPosition.storyName = 'Position: Fixed';
FixedPosition.args = {
  ...defaultArgs,
  position: 'fixed',
};

FixedPosition.decorators = [
  Story => (
    <Flex full alignItems="center" justifyContent="center">
      <Typography color="primary" size="large" variants="italic" volume="quietest">
        See the center of the page
      </Typography>
      <Story />
    </Flex>
  ),
];
