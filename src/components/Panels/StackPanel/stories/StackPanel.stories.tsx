import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { MainPanel } from '../../MainPanel';
import { PanelContainer } from '../../PanelContainer';
import { StackPanel, StackPanelProps } from '../StackPanel';

export default {
  title: 'Surfaces/Panels/StackPanel',
  component: StackPanel,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    fixed: {
      table: {
        category: 'Appearance',
      },
    },
    height: {
      table: {
        category: 'Appearance',
      },
    },
    open: {
      table: {
        category: 'Appearance',
      },
    },
    position: {
      options: ['top', 'bottom'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance',
      },
    },
    raised: {
      table: {
        category: 'Appearance',
      },
    },
    unit: {
      options: ['px', 'percent'],
      control: { type: 'inline-radio' },
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
    transition: {
      control: { type: 'inline-radio' },
      table: {
        category: 'Animation',
      },
    },

    onCloseFinish: {
      table: {
        category: 'Actions',
      },
    },
    onCloseStart: {
      table: {
        category: 'Actions',
      },
    },
    onOpenFinish: {
      table: {
        category: 'Actions',
      },
    },
    onOpenStart: {
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
  },
  decorators: [
    Story => (
      <PanelContainer orientation="horizontal">
        {Story()}
        <MainPanel>Main panel</MainPanel>
      </PanelContainer>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Panels/StackPanel" title="StackPanel" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'The stack panel sits alongside a MainPanel sibling in a horizontal PanelContainer.',
      },
      source: {
        excludeDecorators: false,
      },
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof StackPanel>;

const Template: ComponentStory<typeof StackPanel> = args => <StackPanel {...args} />;

const defaultArgs = {
  children: 'Stack panel',
  duration: 300,
  fixed: false,
  height: 100,
  open: true,
  position: 'left' as StackPanelProps['position'],
  raised: false,
  transition: 'shiftable' as StackPanelProps['transition'],
  unit: 'px' as StackPanelProps['unit'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
