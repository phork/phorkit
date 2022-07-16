import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { Badge, BadgeProps } from '../Badge';
import BadgeDocumentation from './Badge.docs.mdx';

export default {
  title: 'Display/Badge',
  component: Badge,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    color: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    outlined: {
      table: {
        category: 'Appearance',
      },
    },
    pulsing: {
      table: {
        category: 'Appearance',
      },
    },
    position: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', undefined],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    shape: {
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
    Story => (
      <Typography<'div'>
        as="div"
        color="primary"
        style={{
          backgroundColor: 'currentColor',
          borderRadius: '4px',
          height: 100,
          position: 'relative',
          width: 100,
        }}
      >
        {Story()}
      </Typography>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: BadgeDocumentation,
    },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

const defaultArgs = {
  children: '99',
  color: 'primary' as BadgeProps['color'],
  contrast: false,
  outlined: false,
  position: 'top-right' as BadgeProps['position'],
  pulsing: false,
  shape: 'count' as BadgeProps['shape'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Badge.test.js'],
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

export const PointShape = Template.bind({});
PointShape.storyName = 'Shape: Point';
PointShape.args = {
  ...defaultArgs,
  shape: 'point',
};

export const MarkerShape = Template.bind({});
MarkerShape.storyName = 'Shape: Marker';
MarkerShape.args = {
  ...defaultArgs,
  shape: 'marker',
};

export const CountShape = Template.bind({});
CountShape.storyName = 'Shape: Count';
CountShape.args = {
  ...defaultArgs,
  children: 99,
  shape: 'count',
};

export const LabelShape = Template.bind({});
LabelShape.storyName = 'Shape: Label';
LabelShape.args = {
  ...defaultArgs,
  children: 'Beta',
  shape: 'label',
};

export const Pulsing = Template.bind({});
Pulsing.args = {
  ...defaultArgs,
  pulsing: true,
};
