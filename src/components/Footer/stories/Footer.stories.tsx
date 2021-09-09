import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Footer, FooterProps } from '../Footer';

export default {
  title: 'Surfaces/Footer',
  component: Footer,
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
      options: [undefined, 'quiet'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
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
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  decorators: [Story => <div style={{ width: 300 }}>{Story()}</div>],
  parameters: {
    controls: {
      exclude: ['className', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Footer" title="Footer" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'A footer is a flexible container with a colored background and an optional border at the top.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = ({ children, ...args }) => (
  <Footer {...args}>
    {children || (
      <React.Fragment>
        <div>Hello world</div>
        <div>Hello world</div>
      </React.Fragment>
    )}
  </Footer>
);

const defaultArgs = {
  bordered: false,
  children: undefined,
  full: false,
  variant: 'primary' as FooterProps['variant'],
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
