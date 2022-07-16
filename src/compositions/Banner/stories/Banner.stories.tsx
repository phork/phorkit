import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Banner, BannerProps } from '../Banner';

export default {
  title: 'Feedback/Banners/Banner',
  component: Banner,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    immediate: {
      table: {
        category: 'Appearance',
      },
    },
    level: {
      table: {
        category: 'Appearance',
      },
    },
    permanent: {
      table: {
        category: 'Appearance',
      },
    },
    scrollable: {
      table: {
        category: 'Appearance',
      },
    },
    scrollbar: {
      table: {
        category: 'Appearance',
      },
    },

    onClose: {
      table: {
        category: 'Actions',
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
    contextId: {
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
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Banner" title="Banner" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = args => <Banner {...args} />;

const defaultArgs = {
  children: 'This is a wonderfully fun banner.',
  immediate: true,
  level: 'info' as BannerProps['level'],
  permanent: false,
  scrollable: false,
  scrollbar: 'medium' as BannerProps['scrollbar'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Banner.test.js'],
};
*/

export const PrimaryLevel = Template.bind({});
PrimaryLevel.storyName = 'Level: Primary';
PrimaryLevel.args = {
  ...defaultArgs,
  level: 'primary',
};

export const SecondaryLevel = Template.bind({});
SecondaryLevel.storyName = 'Level: Secondary';
SecondaryLevel.args = {
  ...defaultArgs,
  level: 'secondary',
};

export const TertiaryLevel = Template.bind({});
TertiaryLevel.storyName = 'Level: Tertiary';
TertiaryLevel.args = {
  ...defaultArgs,
  level: 'tertiary',
};

export const DangerLevel = Template.bind({});
DangerLevel.storyName = 'Level: Danger';
DangerLevel.args = {
  ...defaultArgs,
  level: 'danger',
};

export const WarningLevel = Template.bind({});
WarningLevel.storyName = 'Level: Warning';
WarningLevel.args = {
  ...defaultArgs,
  level: 'warning',
};

export const SuccessLevel = Template.bind({});
SuccessLevel.storyName = 'Level: Success';
SuccessLevel.args = {
  ...defaultArgs,
  level: 'success',
};

export const InfoLevel = Template.bind({});
InfoLevel.storyName = 'Level: Info';
InfoLevel.args = {
  ...defaultArgs,
  level: 'info',
};

export const ContrastLevel = Template.bind({});
ContrastLevel.storyName = 'Level: Contrast';
ContrastLevel.args = {
  ...defaultArgs,
  level: 'contrast',
};

export const Permanent = Template.bind({});
Permanent.args = {
  ...defaultArgs,
  children: `This banner can't be removed because it's permanent`,
  level: 'tertiary',
  permanent: true,
};
