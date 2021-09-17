import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Position, PositionProps } from '../Position';

export default {
  title: 'Utilities/Position',
  component: Position,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    fixed: {
      table: {
        category: 'Position controls',
      },
    },
    location: {
      table: {
        category: 'Position controls',
      },
    },
    raised: {
      table: {
        category: 'Position controls',
      },
    },
    variant: {
      options: ['outside', 'middle', 'inside'],
      table: {
        category: 'Position controls',
      },
    },

    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  decorators: [
    Story => (
      <div style={{ position: 'relative', width: '40px', height: '40px', backgroundColor: themes.light['color-BG50'] }}>
        {Story()}
      </div>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['className'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Position" title="Position" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'A utility to absolutely position an element relative to its container.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Position>;

const Template: ComponentStory<typeof Position> = args => <Position {...args} />;

const defaultArgs = {
  children: <div style={{ width: '8px', height: '8px', backgroundColor: '#000', borderRadius: '100%' }} />,
  fixed: false,
  location: 'top-left' as PositionProps['location'],
  raised: false,
  variant: 'middle' as PositionProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

const CompleteTemplate: ComponentStory<typeof Position> = ({ variant }) => (
  <React.Fragment>
    <Position raised location="center" style={{ width: 12, height: 12 }}>
      {defaultArgs.children}
    </Position>
    <Position location="bottom-left" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="bottom-center" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="bottom-right" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="top-left" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="top-center" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="top-right" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="left-center" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="right-center" style={{ width: 12, height: 12 }} variant={variant}>
      {defaultArgs.children}
    </Position>
    <Position location="center">
      <div style={{ width: '20px', height: '20px', backgroundColor: '#fff' }} />
    </Position>
  </React.Fragment>
);

export const OutsideVariant = CompleteTemplate.bind({});
OutsideVariant.args = { variant: 'outside' };
OutsideVariant.storyName = 'Variant: Outside';

export const MiddleVariant = CompleteTemplate.bind({});
MiddleVariant.args = { variant: 'middle' };
MiddleVariant.storyName = 'Variant: Middle';

export const InsideVariant = CompleteTemplate.bind({});
InsideVariant.args = { variant: 'inside' };
InsideVariant.storyName = 'Variant: Inside';
