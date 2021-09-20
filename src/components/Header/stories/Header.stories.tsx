import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Header, HeaderProps } from '../Header';

export default {
  title: 'Surfaces/Header',
  component: Header,
  argTypes: {
    bordered: {
      options: [false, true, 'pseudo'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },
    children: {
      control: { type: 'text' },
    },
    full: {
      table: {
        category: 'Primary controls',
      },
    },
    variant: {
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },
    volume: {
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },

    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
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
  decorators: [Story => <div style={{ width: 300 }}>{Story()}</div>],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Header" title="Header" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'A header is a flexible container with a colored background and an optional border at the top.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = ({ children, ...args }) => (
  <Header {...args}>
    {children || (
      <React.Fragment>
        <div>Hello world</div>
        <div>Hello world</div>
      </React.Fragment>
    )}
  </Header>
);

const defaultArgs = {
  bordered: false,
  children: undefined,
  contrast: false,
  full: false,
  variant: 'primary' as HeaderProps['variant'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Bordered = Template.bind({});
Bordered.args = {
  ...defaultArgs,
  bordered: true,
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.storyName = 'Variant: Primary';
PrimaryVariant.args = {
  ...defaultArgs,
  bordered: true,
  variant: 'primary',
};

export const SecondaryVariant = Template.bind({});
SecondaryVariant.storyName = 'Variant: Secondary';
SecondaryVariant.args = {
  ...defaultArgs,
  bordered: true,
  variant: 'secondary',
};

export const TransparentVariant = Template.bind({});
TransparentVariant.storyName = 'Variant: Transparent';
TransparentVariant.args = {
  ...defaultArgs,
  bordered: true,
  variant: 'transparent',
};
