import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Paper, PaperProps } from '../Paper';

const lipsumChildren = [
  <p key="first">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam sem, tincidunt nec vehicula non, auctor ac nulla.
    Aenean accumsan mi et odio tempus, ac consectetur lorem porta. Quisque fermentum porttitor laoreet. Ut efficitur
    libero feugiat, suscipit ligula eget, ultricies turpis. Nullam congue eu urna id blandit. Morbi sit amet lectus ac
    orci venenatis pulvinar. Morbi rhoncus nec libero ac imperdiet. Vivamus sem purus, pharetra vel lacus at, feugiat
    finibus libero. Fusce sapien massa, eleifend ut fringilla et, pulvinar a tellus. Nulla nisi dui, venenatis sed
    elementum luctus, sagittis sit amet neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
    inceptos himenaeos. Proin ultrices mauris dapibus justo ultricies varius. Cras eleifend lorem lorem, eu semper
    ligula pharetra non. Donec eleifend massa eu consequat pretium. Curabitur dui lorem, condimentum sed interdum ac,
    dapibus eu purus.
  </p>,
  <p key="last">
    Curabitur dolor arcu, elementum sit amet arcu non, eleifend molestie sapien. Fusce ut volutpat nibh. Mauris
    ullamcorper ac ipsum ut pulvinar. Duis a ipsum vitae enim mollis ornare. Pellentesque ut ex erat. Integer id
    faucibus eros. Sed aliquam facilisis tellus, nec semper ante dapibus ut. Ut imperdiet, metus sed volutpat venenatis,
    neque dolor egestas dui, eget rhoncus dui eros ut enim.
  </p>,
];

export default {
  title: 'Surfaces/Paper',
  component: Paper,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    bordered: {
      table: {
        category: 'Appearance controls',
      },
    },
    color: {
      control: { type: 'select' },
      table: {
        category: 'Appearance controls',
      },
    },
    contained: {
      table: {
        category: 'Appearance controls',
      },
    },
    container: {
      options: [undefined, 'banner', 'page', 'panel', 'popover'],
      table: {
        category: 'Appearance controls',
      },
    },
    flexible: {
      table: {
        category: 'Appearance controls',
      },
    },
    full: {
      table: {
        category: 'Appearance controls',
      },
    },
    scrollable: {
      table: {
        category: 'Appearance controls',
      },
    },
    scrollbar: {
      options: ['xsmall', 'small', 'medium'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },

    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Paper" title="Paper" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component:
          'The paper component sets the text color and adds a background color and optional border and scrollbars around its children.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Paper>;

const Template: ComponentStory<typeof Paper> = args => <Paper {...args} />;

const defaultArgs = {
  container: 'page' as PaperProps['container'],
  children: 'Hello world',
  scrollbar: 'medium' as PaperProps['scrollbar'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const ExtremeColor = Template.bind({});
ExtremeColor.storyName = 'Color: Extreme';
ExtremeColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'extreme',
};

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
};

export const SecondaryColor = Template.bind({});
SecondaryColor.storyName = 'Color: Secondary';
SecondaryColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'secondary',
};

export const TertiaryColor = Template.bind({});
TertiaryColor.storyName = 'Color: Tertiary';
TertiaryColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'tertiary',
};

export const TransparentColor = Template.bind({});
TransparentColor.storyName = 'Color: Transparent';
TransparentColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'transparent',
};

export const AccentPrimaryColor = Template.bind({});
AccentPrimaryColor.storyName = 'Color: Accent primary';
AccentPrimaryColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'accent-primary',
};

export const ContrastColor = Template.bind({});
ContrastColor.storyName = 'Color: Contrast';
ContrastColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'contrast',
};

export const SuccessColor = Template.bind({});
SuccessColor.storyName = 'Color: Success';
SuccessColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'success',
};

export const WarningColor = Template.bind({});
WarningColor.storyName = 'Color: Warning';
WarningColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'warning',
};

export const DangerColor = Template.bind({});
DangerColor.storyName = 'Color: Danger';
DangerColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'danger',
};

export const MediumScrollbar = Template.bind({});
MediumScrollbar.storyName = 'Scrollbar: Medium';
MediumScrollbar.args = {
  ...defaultArgs,
  children: lipsumChildren,
  color: 'primary',
  container: undefined,
  scrollable: true,
  scrollbar: 'medium',
  style: { height: '80px', maxWidth: '800px' },
};

export const SmallScrollbar = Template.bind({});
SmallScrollbar.storyName = 'Scrollbar: Small';
SmallScrollbar.args = {
  ...defaultArgs,
  children: lipsumChildren,
  color: 'primary',
  container: undefined,
  scrollable: true,
  scrollbar: 'small',
  style: { height: '80px', maxWidth: '800px' },
};

export const XSmallScrollbar = Template.bind({});
XSmallScrollbar.storyName = 'Scrollbar: XSmall';
XSmallScrollbar.args = {
  ...defaultArgs,
  children: lipsumChildren,
  color: 'primary',
  container: undefined,
  scrollable: true,
  scrollbar: 'xsmall',
  style: { height: '80px', maxWidth: '800px' },
};

export const BannerContainer = Template.bind({});
BannerContainer.storyName = 'Container: Banner';
BannerContainer.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
  container: 'banner',
};

export const PageContainer = Template.bind({});
PageContainer.storyName = 'Container: Page';
PageContainer.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
  container: 'page',
};

export const PanelContainer = Template.bind({});
PanelContainer.storyName = 'Container: Panel';
PanelContainer.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
  container: 'panel',
};

export const PopoverContainer = Template.bind({});
PopoverContainer.storyName = 'Container: Popover';
PopoverContainer.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
  container: 'popover',
};
