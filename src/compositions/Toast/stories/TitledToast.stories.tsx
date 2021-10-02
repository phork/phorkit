import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { TitledToast, TitledToastProps } from '../TitledToast';

export default {
  title: 'Feedback/Toasts/TitledToast',
  component: TitledToast,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    level: {
      control: { type: 'radio' },
      table: {
        category: 'Primary',
      },
    },
    title: {
      table: {
        category: 'Primary',
      },
    },
    variant: {
      options: ['colored', undefined],
      table: {
        category: 'Primary',
      },
    },

    created: {
      table: {
        category: 'Countdown',
      },
    },
    duration: {
      table: {
        category: 'Countdown',
      },
    },

    onClose: {
      table: {
        category: 'Actions',
      },
    },
    onPin: {
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
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    immediate: {
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
      exclude: ['translations'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Toast" title="TitledToast" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'An icon toast is a small notification that pops up with an icon, an optional title and a body.',
      },
    },
  },
} as ComponentMeta<typeof TitledToast>;

const Template: ComponentStory<typeof TitledToast> = args => <TitledToast {...args} />;

const defaultArgs = {
  children: 'This is a wonderfully fun toast.',
  contrast: false,
  immediate: true,
  level: 'info' as TitledToastProps['level'],
  title: 'Hello world',
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
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

export const ColoredDangerLevel = Template.bind({});
ColoredDangerLevel.storyName = 'Colored danger';
ColoredDangerLevel.args = {
  ...defaultArgs,
  level: 'danger',
  variant: 'colored',
};

export const ColoredWarningLevel = Template.bind({});
ColoredWarningLevel.storyName = 'Colored warning';
ColoredWarningLevel.args = {
  ...defaultArgs,
  level: 'warning',
  variant: 'colored',
};

export const ColoredSuccessLevel = Template.bind({});
ColoredSuccessLevel.storyName = 'Colored success';
ColoredSuccessLevel.args = {
  ...defaultArgs,
  level: 'success',
  variant: 'colored',
};

export const ColoredInfoLevel = Template.bind({});
ColoredInfoLevel.storyName = 'Colored info';
ColoredInfoLevel.args = {
  ...defaultArgs,
  level: 'info',
  variant: 'colored',
};
