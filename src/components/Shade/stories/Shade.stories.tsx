import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Shade, ShadeProps } from '../Shade';

export default {
  title: 'Surfaces/Shade',
  component: Shade,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    color: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },

    active: {
      table: {
        category: 'State',
      },
    },
    focused: {
      table: {
        category: 'State',
      },
    },
    hovered: {
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
          <PageTitle src="components/Shade" title="Shade" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Shade>;

const Template: ComponentStory<typeof Shade> = args => <Shade {...args} />;

const defaultArgs = {
  actionable: false,
  active: false,
  children: 'Hello world',
  color: 'primary' as ShadeProps['color'],
  focused: false,
  hovered: false,
  style: { padding: '24px' },
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

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

export const Actionable = Template.bind({});
Actionable.storyName = 'Actionable';
Actionable.args = {
  ...defaultArgs,
  actionable: true,
  color: 'primary',
};

export const ActiveState = Template.bind({});
ActiveState.storyName = 'State: Active';
ActiveState.args = {
  ...defaultArgs,
  actionable: true,
  active: true,
  color: 'primary',
};

export const FocusedState = Template.bind({});
FocusedState.storyName = 'State: Focused';
FocusedState.args = {
  ...defaultArgs,
  actionable: true,
  color: 'primary',
  focused: true,
};

export const HoveredState = Template.bind({});
HoveredState.storyName = 'State: Hovered';
HoveredState.args = {
  ...defaultArgs,
  actionable: true,
  color: 'primary',
  hovered: true,
};
