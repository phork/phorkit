import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Paper, PaperProps } from '../Paper';
import PaperDocumentation from './Paper.docs.mdx';

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
      control: {
        type: 'text',
      },
    },

    bordered: {
      table: {
        category: 'Appearance',
      },
    },
    color: {
      options: [
        'success',
        'warning',
        'danger',
        'primary',
        'secondary',
        'tertiary',
        'accent',
        'contrast',
        'transparent',
        'extreme',
        undefined,
      ],
      control: {
        type: 'select',
      },
      table: {
        category: 'Appearance',
      },
    },
    contained: {
      table: {
        category: 'Appearance',
      },
    },
    container: {
      options: [undefined, 'banner', 'page', 'panel', 'popover'],
      table: {
        category: 'Appearance',
      },
    },
    flexible: {
      table: {
        category: 'Appearance',
      },
    },
    full: {
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
      options: ['xsmall', 'small', 'medium'],
      control: {
        type: 'inline-radio',
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
      page: PaperDocumentation,
    },
  },
} as ComponentMeta<typeof Paper>;

const Template: ComponentStory<typeof Paper> = args => <Paper {...args} />;

const defaultArgs = {
  bordered: false,
  contained: false,
  container: 'page' as PaperProps['container'],
  children: 'Hello world',
  flexible: false,
  full: false,
  scrollable: false,
  scrollbar: 'medium' as PaperProps['scrollbar'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  color: 'transparent',
};

/*
Default.parameters = {
  jest: ['Paper.test.js'],
};
*/

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

export const AccentColor = Template.bind({});
AccentColor.storyName = 'Color: Accent';
AccentColor.args = {
  ...defaultArgs,
  bordered: true,
  color: 'accent',
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

const layoutDecorators: typeof Default.decorators = [
  Story => <div style={{ position: 'relative', height: '100px' }}>{Story()}</div>,
];

export const FlexibleLayout = Template.bind({});
FlexibleLayout.decorators = layoutDecorators;
FlexibleLayout.storyName = 'Flexible';
FlexibleLayout.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
  container: 'panel',
  flexible: true,
};

export const FullLayout = Template.bind({});
FullLayout.decorators = layoutDecorators;
FullLayout.storyName = 'Full';
FullLayout.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
  container: 'panel',
  full: true,
};

export const ContainedLayout = Template.bind({});
ContainedLayout.decorators = layoutDecorators;
ContainedLayout.storyName = 'Contained';
ContainedLayout.args = {
  ...defaultArgs,
  bordered: true,
  color: 'primary',
  container: 'panel',
  contained: true,
};
