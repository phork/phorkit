import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PhorkIcon } from 'icons/PhorkIcon';
import { InteractiveGroupSelectEventHandlerProps } from 'components/InteractiveGroup/types';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { StoryComponentDemo } from 'stories/helpers/StoryComponentDemo';
import { Navigation, NavigationProps } from '../Navigation';
import { items } from './helpers/items';
import NavigationDocumentation from './Navigation.docs.mdx';

export default {
  title: 'Navigation/Navigation',
  component: Navigation,
  argTypes: {
    animated: {
      table: {
        category: 'Appearance',
      },
    },
    fullHeight: {
      table: {
        category: 'Appearance',
      },
    },
    fullWidth: {
      table: {
        category: 'Appearance',
      },
    },
    highlightRadius: {
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      table: {
        category: 'Appearance',
      },
    },

    items: {
      table: {
        category: 'State',
      },
    },
    selectedId: {
      table: {
        category: 'State',
      },
    },

    allowRightClickLinks: {
      table: {
        category: 'Actions',
      },
    },
    onSelect: {
      table: {
        category: 'Actions',
      },
    },
    triggerLinks: {
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
    (Story, { initialArgs: { selectedId } }) => (
      <StoryComponentDemo<string, NonNullable<NavigationProps['onSelect']>>
        eventHandlerName="onSelect"
        initialValue={selectedId || items[0].id}
        onSelect={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
        processValue={(item: InteractiveGroupSelectEventHandlerProps) => item?.id}
        style={{ maxWidth: 800 }}
        valuePropName="selectedId"
      >
        {Story()}
      </StoryComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: NavigationDocumentation,
    },
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = args => <Navigation {...args} />;

const defaultArgs = {
  allowRightClickLinks: false,
  animated: false,
  fullHeight: false,
  fullWidth: false,
  items,
  orientation: 'horizontal' as NavigationProps['orientation'],
  selectedId: 'first',
  triggerLinks: false,
  unthemed: false,
  variant: 'primary' as NavigationProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Navigation.test.js'],
};
*/

export const Animated = Template.bind({});
Animated.args = {
  ...defaultArgs,
  animated: true,
};

export const HorizontalOrientation = Template.bind({});
HorizontalOrientation.storyName = 'Orientation: Horizontal';
HorizontalOrientation.args = {
  ...defaultArgs,
  animated: true,
  orientation: 'horizontal',
};

export const VerticalOrientation = Template.bind({});
VerticalOrientation.storyName = 'Orientation: Vertical';
VerticalOrientation.args = {
  ...defaultArgs,
  animated: true,
  orientation: 'vertical',
};

export const SecondaryVariantHorizontal = Template.bind({});
SecondaryVariantHorizontal.storyName = 'Variant: Secondary, horizontal';
SecondaryVariantHorizontal.args = {
  ...defaultArgs,
  animated: true,
  orientation: 'horizontal',
  variant: 'secondary',
};

export const SecondaryVariantVertical = Template.bind({});
SecondaryVariantVertical.storyName = 'Variant: Secondary, vertical';
SecondaryVariantVertical.args = {
  ...defaultArgs,
  animated: true,
  orientation: 'vertical',
  variant: 'secondary',
};

export const TertiaryVariantHorizontal = Template.bind({});
TertiaryVariantHorizontal.storyName = 'Variant: Tertiary, horizontal';
TertiaryVariantHorizontal.args = {
  ...defaultArgs,
  animated: true,
  orientation: 'horizontal',
  variant: 'tertiary',
};

export const TertiaryVariantVertical = Template.bind({});
TertiaryVariantVertical.storyName = 'Variant: Tertiary, vertical';
TertiaryVariantVertical.args = {
  ...defaultArgs,
  animated: true,
  orientation: 'vertical',
  variant: 'tertiary',
};

export const IconNavigation = Template.bind({});
IconNavigation.storyName = 'Icon navigation';
IconNavigation.args = {
  ...defaultArgs,
  animated: true,
  highlightRadius: 4,
  items: [
    {
      id: 'first',
      label: <PhorkIcon size={24} />,
      flush: true,
      style: { padding: '8px', marginBottom: '4px' },
    },
    {
      id: 'second',
      label: <PhorkIcon size={24} />,
      flush: true,
      style: { padding: '8px', marginBottom: '4px' },
    },
    {
      id: 'third',
      label: <PhorkIcon size={24} />,
      flush: true,
      style: { padding: '8px', marginBottom: '4px' },
      disabled: true,
    },
    {
      id: 'fourth',
      label: <PhorkIcon size={24} />,
      flush: true,
      style: { padding: '8px' },
    },
  ],
  orientation: 'vertical',
  variant: 'tertiary',
};

export const CustomLabels = Template.bind({});
CustomLabels.storyName = 'Custom labels';
CustomLabels.args = {
  ...defaultArgs,
  animated: true,
  highlightRadius: 4,
  items: [
    {
      id: 'first',
      label: (
        <Rhythm px={2}>
          <Typography size="xsmall" variants={['letter-spacing-comfy', 'uppercase']}>
            First
          </Typography>
        </Rhythm>
      ),
      style: { marginRight: '4px' },
    },
    {
      id: 'second',
      label: (
        <Rhythm px={2}>
          <Typography size="xsmall" variants={['letter-spacing-comfy', 'uppercase']}>
            Second
          </Typography>
        </Rhythm>
      ),
      style: { marginRight: '4px' },
    },
    {
      id: 'third',
      label: (
        <Rhythm px={2}>
          <Typography size="xsmall" variants={['letter-spacing-comfy', 'uppercase']}>
            Third
          </Typography>
        </Rhythm>
      ),
      disabled: true,
      style: { marginRight: '4px' },
    },
    {
      id: 'fourth',
      label: (
        <Rhythm px={2}>
          <Typography size="xsmall" variants={['letter-spacing-comfy', 'uppercase']}>
            Fourth
          </Typography>
        </Rhythm>
      ),
    },
  ],
  variant: 'tertiary',
};

export const AsLinks = Template.bind({});
AsLinks.storyName = 'As links';
AsLinks.args = {
  ...defaultArgs,
  animated: true,
  triggerLinks: true,
  items: [
    {
      id: 'first',
      label: (
        <a href="#first" tabIndex={-1}>
          First
        </a>
      ),
    },
    {
      id: 'second',
      label: (
        <a href="#second" tabIndex={-1}>
          Second
        </a>
      ),
    },
    {
      id: 'third',
      label: (
        <a href="#third" tabIndex={-1}>
          Third
        </a>
      ),
      disabled: true,
    },
    {
      id: 'fourth',
      label: (
        <a href="#fourth" tabIndex={-1}>
          Fourth
        </a>
      ),
    },
  ],
};

AsLinks.parameters = {
  docs: {
    description: {
      story: 'Note that the links will cause the page to reload so the state will appear unchanged.',
    },
  },
};

export const RightClickLinks = Template.bind({});
RightClickLinks.storyName = 'Right click links';
RightClickLinks.args = {
  ...defaultArgs,
  allowRightClickLinks: true,
  animated: true,
  items: [
    { id: 'first', label: 'First', href: '#first' },
    { id: 'second', label: 'Second', href: '#second' },
    { id: 'third', label: 'Third', href: '#third', disabled: true },
    { id: 'fourth', label: 'Fourth', href: '#fourth' },
    { id: 'fifth', label: 'Trigger', triggerOnly: () => (window.location.href = '#fifth') },
  ],
};

export const LabelFunctions = Template.bind({});
LabelFunctions.storyName = 'Label functions';
LabelFunctions.args = {
  ...defaultArgs,
  animated: true,
  items: [
    { id: 'first', label: ({ focused }) => `First${focused ? ' is focused' : ''}` },
    { id: 'second', label: ({ focused }) => `Second${focused ? ' is focused' : ''}` },
    { id: 'third', label: ({ focused }) => `Third${focused ? ' is focused' : ''}`, disabled: true },
    { id: 'fourth', label: ({ focused }) => `Fourth${focused ? ' is focused' : ''}` },
  ],
};
