import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { HeartIcon } from 'icons/internal/HeartIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { IconCount, IconCountProps } from '../IconCount';

export default {
  title: 'Display/IconCount',
  component: IconCount,
  argTypes: {
    active: {
      table: {
        category: 'Appearance',
      },
    },
    count: {
      table: {
        category: 'Appearance',
      },
    },
    icon: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    iconSize: {
      table: {
        category: 'Appearance',
      },
    },
    inline: {
      table: {
        category: 'Appearance',
      },
    },
    label: {
      table: {
        category: 'Appearance',
      },
    },
    reverse: {
      table: {
        category: 'Appearance',
      },
    },
    typographySize: {
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
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/IconCount" title="IconCount" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof IconCount>;

const Template: ComponentStory<typeof IconCount> = args => <IconCount {...args} />;

const defaultArgs = {
  active: false,
  count: 42,
  icon: HeartIcon,
  iconSize: 15,
  inline: false,
  label: 'Icon label',
  reverse: false,
  typographySize: 'xsmall' as IconCountProps['typographySize'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['IconCount.test.js'],
};
*/

export const Active = Template.bind({});
Active.args = {
  ...defaultArgs,
  active: true,
};

export const Reverse = Template.bind({});
Reverse.args = {
  ...defaultArgs,
  icon: CheckIcon,
  inline: true,
  reverse: true,
  typographySize: 'large',
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  iconSize: 16,
  typographySize: 'small',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  iconSize: 18,
  typographySize: 'medium',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  iconSize: 20,
  typographySize: 'large',
};

export const XLargeSize = Template.bind({});
XLargeSize.storyName = 'Size: XLarge';
XLargeSize.args = {
  ...defaultArgs,
  iconSize: 24,
  typographySize: 'xlarge',
};
