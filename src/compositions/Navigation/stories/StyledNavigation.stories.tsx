import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledNavigation, StyledNavigationProps } from '../StyledNavigation';
import { items } from './helpers/items';
import navigationStory from './Navigation.stories';

const argTypes = { ...navigationStory.argTypes };
delete argTypes.themeId;

export default {
  ...navigationStory,
  title: 'Navigation/Navigation/StyledNavigation',
  component: StyledNavigation,
  argTypes: {
    focusedBorderColor: {
      table: {
        category: 'Styled',
      },
    },
    itemFocusedBackgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    itemFocusedSelectedBackgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    itemFocusedSelectedTextColor: {
      table: {
        category: 'Styled',
      },
    },
    itemFocusedTextColor: {
      table: {
        category: 'Styled',
      },
    },
    itemHoveredBorderColor: {
      table: {
        category: 'Styled',
      },
    },
    itemSelectedBackgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    itemSelectedBorderColor: {
      table: {
        category: 'Styled',
      },
    },
    itemSelectedTextColor: {
      table: {
        category: 'Styled',
      },
    },
    itemTextColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...navigationStory.parameters,
    docs: {
      ...navigationStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Navigation" title="StyledNavigation" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledNavigation>;

const Template: ComponentStory<typeof StyledNavigation> = args => <StyledNavigation {...args} />;

const defaultArgs = {
  allowRightClickLinks: false,
  animated: false,
  focusedBorderColor: '#f41150',
  fullHeight: false,
  fullWidth: false,
  itemBackgroundColor: 'transparent',
  itemFocusedBackgroundColor: '#f41150',
  itemFocusedSelectedBackgroundColor: '#F86F95',
  itemFocusedSelectedTextColor: '#fff',
  itemFocusedTextColor: '#fff',
  itemHoveredBorderColor: '#f41150',
  items,
  itemSelectedBackgroundColor: '#F86F95',
  itemSelectedBorderColor: '#f41150',
  itemSelectedTextColor: '#fff',
  itemTextColor: '#f41150',
  orientation: 'horizontal' as StyledNavigationProps['orientation'],
  selectedId: 'first',
  triggerLinks: false,
  variant: 'primary' as StyledNavigationProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledNavigation.test.js', 'Navigation.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
