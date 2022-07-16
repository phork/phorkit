import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { themes } from '../../../config/themes';
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

    actionable: {
      table: {
        category: 'Appearance',
      },
    },
    color: {
      table: {
        category: 'Appearance',
      },
    },
    opaque: {
      table: {
        category: 'Appearance',
      },
    },
    unbordered: {
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
  opaque: false,
  style: { padding: '24px' },
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Shade.test.js'],
};
*/

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
};

export const PrimaryColorOpaque = Template.bind({});
PrimaryColorOpaque.storyName = 'Color: Primary, opaque';
PrimaryColorOpaque.args = {
  ...defaultArgs,
  color: 'primary',
  opaque: true,
};

export const SuccessColor = Template.bind({});
SuccessColor.storyName = 'Color: Success';
SuccessColor.args = {
  ...defaultArgs,
  color: 'success',
};

export const SuccessColorOpaque = Template.bind({});
SuccessColorOpaque.storyName = 'Color: Success, opaque';
SuccessColorOpaque.args = {
  ...defaultArgs,
  color: 'success',
  opaque: true,
};

export const WarningColor = Template.bind({});
WarningColor.storyName = 'Color: Warning';
WarningColor.args = {
  ...defaultArgs,
  color: 'warning',
};

export const WarningColorOpaque = Template.bind({});
WarningColorOpaque.storyName = 'Color: Warning, opaque';
WarningColorOpaque.args = {
  ...defaultArgs,
  color: 'warning',
  opaque: true,
};

export const DangerColor = Template.bind({});
DangerColor.storyName = 'Color: Danger';
DangerColor.args = {
  ...defaultArgs,
  color: 'danger',
};

export const DangerColorOpaque = Template.bind({});
DangerColorOpaque.storyName = 'Color: Danger, opaque';
DangerColorOpaque.args = {
  ...defaultArgs,
  color: 'danger',
  opaque: true,
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const NeutralColorOpaque = Template.bind({});
NeutralColorOpaque.storyName = 'Color: Neutral, opaque';
NeutralColorOpaque.args = {
  ...defaultArgs,
  color: 'neutral',
  opaque: true,
};

export const Unbordered = Template.bind({});
Unbordered.args = {
  ...defaultArgs,
  color: 'primary',
  unbordered: true,
};

export const Actionable = Template.bind({});
Actionable.storyName = 'Actionable';
Actionable.args = {
  ...defaultArgs,
  actionable: true,
  color: 'primary',
};

export const ActionableOpaque = Template.bind({});
ActionableOpaque.storyName = 'Actionable, opaque';
ActionableOpaque.args = {
  ...defaultArgs,
  actionable: true,
  color: 'primary',
  opaque: true,
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

export const Styled = Template.bind({});
Styled.storyName = 'Custom styles';
Styled.args = {
  ...defaultArgs,
  style: {
    ...defaultArgs.style,
    '--shade-active-primary-color': themes.light['color-P50-D10'],
    '--shade-inverse-color': themes.light['color-P50-contrast'],
    '--shade-primary-color': themes.light['color-P50'],
    '--shade-opaque-primary-color': themes.light['color-P50-shade'],
  } as React.CSSProperties,
  unthemed: true,
};
