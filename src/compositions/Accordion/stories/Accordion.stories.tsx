import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PhorkIcon } from 'icons/PhorkIcon';
import { Flex } from 'components/Flex';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { Accordion, AccordionProps } from '../Accordion';
import { items } from './helpers/items';
import AccordionDocumentation from './Accordion.docs.mdx';

export default {
  title: 'Surfaces/Accordion',
  component: Accordion,
  argTypes: {
    flush: {
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      table: {
        category: 'Appearance',
      },
    },

    duration: {
      table: {
        category: 'Animation',
      },
    },
    easing: {
      table: {
        category: 'Animation',
      },
    },

    initialSelected: {
      table: {
        category: 'Input',
      },
    },
    maxSelect: {
      table: {
        category: 'Input',
      },
    },
    minSelect: {
      table: {
        category: 'Input',
      },
    },

    items: {
      table: {
        category: 'State',
      },
    },

    onKeyDown: {
      table: {
        category: 'Actions',
      },
    },
    onSelect: {
      table: {
        category: 'Actions',
      },
    },

    children: {
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
    disableScrollIntoView: {
      table: {
        category: 'Uncommon',
      },
    },
    id: {
      table: {
        category: 'Uncommon',
      },
    },
    listProps: {
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
    unstyled: {
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
      page: AccordionDocumentation,
    },
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = args => <Accordion {...args} />;

const defaultArgs = {
  contrast: false,
  flush: false,
  items,
  onKeyDown: undefined,
  orientation: 'vertical' as AccordionProps['orientation'],
  unstyled: false,
  unthemed: false,
  variant: 'primary' as AccordionProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Accordion.test.js'],
};
*/

export const VerticalOrientation = Template.bind({});
VerticalOrientation.storyName = 'Orientation: Vertical';
VerticalOrientation.args = {
  ...defaultArgs,
  orientation: 'vertical',
};

export const HorizontalOrientation = Template.bind({});
HorizontalOrientation.storyName = 'Orientation: Horizontal';
HorizontalOrientation.args = {
  ...defaultArgs,
  items: [
    {
      id: 'first',
      label: '1',
      content: (
        <Rhythm mx={4} my={2}>
          First panel
        </Rhythm>
      ),
    },
    {
      id: 'second',
      label: '2',
      content: (
        <Rhythm mx={4} my={2}>
          Second panel
        </Rhythm>
      ),
    },
    {
      id: 'third',
      label: '3',
      content: (
        <Rhythm mx={4} my={2}>
          Third panel
        </Rhythm>
      ),
      disabled: true,
    },
    {
      id: 'fourth',
      label: '4',
      content: (
        <Rhythm mx={4} my={2}>
          {'Fourth panel '.repeat(150).trim()}
        </Rhythm>
      ),
    },
  ],
  orientation: 'horizontal',
};

export const MultiSelect = Template.bind({});
MultiSelect.storyName = 'Multi-select';
MultiSelect.args = {
  ...defaultArgs,
  maxSelect: -1,
};

export const AllowUnselect = Template.bind({});
AllowUnselect.storyName = 'Allow unselect';
AllowUnselect.args = {
  ...defaultArgs,
  minSelect: 0,
};

export const IconsOnly = Template.bind({});
IconsOnly.storyName = 'Icons only';
IconsOnly.args = {
  ...defaultArgs,
  items: [
    {
      id: 'first',
      iconOnly: true,
      label: <PhorkIcon scale="medium" />,
      content: (
        <Rhythm ml={2}>
          <Flex full alignItems="center">
            <Typography variants="no-wrap">First panel</Typography>
          </Flex>
        </Rhythm>
      ),
    },
    {
      id: 'second',
      iconOnly: true,
      label: <PhorkIcon scale="medium" />,
      content: (
        <Rhythm ml={2}>
          <Flex full alignItems="center">
            <Typography variants="no-wrap">Second panel</Typography>
          </Flex>
        </Rhythm>
      ),
    },
    {
      id: 'third',
      iconOnly: true,
      label: <PhorkIcon scale="medium" />,
      content: (
        <Rhythm ml={2}>
          <Flex full alignItems="center">
            <Typography variants="no-wrap">Third panel</Typography>
          </Flex>
        </Rhythm>
      ),
      disabled: true,
    },
    {
      id: 'fourth',
      iconOnly: true,
      label: <PhorkIcon scale="medium" />,
      content: (
        <Rhythm ml={2}>
          <Flex full alignItems="center">
            <Typography variants="no-wrap">Fourth panel</Typography>
          </Flex>
        </Rhythm>
      ),
    },
  ],
  orientation: 'horizontal',
};

export const ItemFunctions = Template.bind({});
ItemFunctions.storyName = 'Item functions';
ItemFunctions.args = {
  ...defaultArgs,
  items: [
    {
      id: 'first',
      label: ({ focused }) => `First${focused ? ' is focused' : ''}`,
      content: ({ selected }) => <Rhythm px={5} py={2}>{`First panel${selected ? ' is selected' : ''}`}</Rhythm>,
    },
    {
      id: 'second',
      label: ({ focused }) => `Second${focused ? ' is focused' : ''}`,
      content: ({ selected }) => <Rhythm px={5} py={2}>{`Second panel${selected ? ' is selected' : ''}`}</Rhythm>,
    },
    {
      id: 'third',
      label: ({ focused }) => `Third${focused ? ' is focused' : ''}`,
      content: ({ selected }) => <Rhythm px={5} py={2}>{`Third panel${selected ? ' is selected' : ''}`}</Rhythm>,
      disabled: true,
    },
    {
      id: 'fourth',
      label: ({ focused }) => `Fourth${focused ? ' is focused' : ''}`,
      content: ({ selected }) => <Rhythm px={5} py={2}>{`Fourth panel${selected ? ' is selected' : ''}`}</Rhythm>,
    },
  ],
};
