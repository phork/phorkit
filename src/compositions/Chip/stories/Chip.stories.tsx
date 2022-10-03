import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { TimesIcon } from 'icons/TimesIcon';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { AvatarProps } from 'components/Avatar/Avatar';
import { IconButton } from 'components/Button/IconButton';
import { Rhythm } from 'components/Rhythm/Rhythm';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Chip, ChipProps } from '../Chip';

export default {
  title: 'Display/Chip',
  component: Chip,
  argTypes: {
    actionable: {
      table: {
        category: 'Appearance',
      },
    },
    active: {
      table: {
        category: 'Appearance',
      },
    },
    avatar: {
      table: {
        category: 'Appearance',
      },
    },
    focused: {
      table: {
        category: 'Appearance',
      },
    },
    hovered: {
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
    shape: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
      options: ['2xsmall', 'xsmall', 'small', 'medium', 'large'],
      table: {
        category: 'Appearance',
      },
    },
    text: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    weight: {
      table: {
        category: 'Appearance',
      },
    },

    as: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
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
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Chip" title="Chip" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = args => <Chip {...args} />;

const defaultArgs = {
  actionable: false,
  active: false,
  avatar: { initials: 'P', color: 'primary' as AvatarProps['color'], imgSrc: '/images/avatar.jpg' },
  contrast: false,
  focused: false,
  hovered: false,
  icon: (
    <Rhythm mr={2}>
      <CheckIcon scale="medium" />
    </Rhythm>
  ),
  shape: 'pill' as ChipProps['shape'],
  size: 'medium' as ChipProps['size'],
  text: 'Hello world',
  unthemed: false,
  weight: 'shaded' as ChipProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Chip.test.js'],
};
*/

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
  icon: (
    <Rhythm mr={2}>
      <CheckIcon size={18} />
    </Rhythm>
  ),
  size: 'large',
};

export const Initials = Template.bind({});
Initials.args = {
  ...defaultArgs,
  avatar: { initials: 'P', color: 'primary' as AvatarProps['color'] },
  size: 'medium',
};

export const Actionable = Template.bind({});
Actionable.args = {
  ...defaultArgs,
  actionable: true,
  avatar: { initials: 'P', color: 'primary' as AvatarProps['color'] },
  size: 'medium',
};

export const ButtonIcon = Template.bind({});
ButtonIcon.storyName = 'With an icon button';
ButtonIcon.args = {
  ...defaultArgs,
  avatar: { initials: 'P', color: 'primary' as AvatarProps['color'] },
  icon: (
    <Rhythm p={1}>
      <IconButton noHeight aria-label="Remove tag" color="neutral" onClick={action('remove tag')} shape="circle">
        <TimesIcon scale="xsmall" />
      </IconButton>
    </Rhythm>
  ),
  size: 'medium',
};
