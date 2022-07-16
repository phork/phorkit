import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { ListProps } from '../../../docs/helpers/ListProps';
import { DropdownEmpty } from '../DropdownEmpty';

export default {
  title: 'Form/Dropdown/DropdownEmpty',
  component: DropdownEmpty,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    filter: {
      table: {
        category: 'Appearance',
      },
    },
    layout: {
      options: ['raised', 'contained', undefined],
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
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Dropdown" title="DropdownEmpty" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof DropdownEmpty>;

const Template: ComponentStory<typeof DropdownEmpty> = args => <DropdownEmpty {...args} />;

const defaultArgs = {
  contrast: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['DropdownEmpty.test.js'],
};
*/

export const Filtered = Template.bind({});
Filtered.args = {
  ...defaultArgs,
  filter: 'Yellow',
};

export const StringNotification = Template.bind({});
StringNotification.storyName = 'Children as string';
StringNotification.args = {
  ...defaultArgs,
  children: 'This is a string notification',
};

export const ComponentNotification = Template.bind({});
ComponentNotification.storyName = 'Children as component';
ComponentNotification.args = {
  ...defaultArgs,
  children: <ListProps />,
  filter: 'Yellow',
};

export const FunctionNotification = Template.bind({});
FunctionNotification.storyName = 'Children as function';
FunctionNotification.args = {
  ...defaultArgs,
  children: ({ filter }) => <React.Fragment>{`This is a functional notification passed "${filter}"`}</React.Fragment>,
  filter: 'Yellow',
};

export const CustomTranslations = Template.bind({});
CustomTranslations.storyName = 'Custom translations';
CustomTranslations.args = {
  ...defaultArgs,
  filter: 'Yellow',
  translations: {
    noOptions: 'Oops! There are no options available right now.',
    noFilteredOptions: 'Oops! There are no options available right now for "{0}".',
  },
};
