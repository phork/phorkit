import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { MainPanel } from '../../MainPanel';
import { PanelContainer } from '../../PanelContainer';
import { SidePanel, SidePanelProps } from '../SidePanel';

export default {
  title: 'Surfaces/Panels/SidePanel',
  component: SidePanel,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    fixed: {
      table: {
        category: 'Layout controls',
      },
    },
    open: {
      table: {
        category: 'Layout controls',
      },
    },
    position: {
      options: ['left', 'right'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Layout controls',
      },
    },
    raised: {
      table: {
        category: 'Layout controls',
      },
    },
    unit: {
      options: ['px', 'percent'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Layout controls',
      },
    },
    width: {
      table: {
        category: 'Layout controls',
      },
    },

    duration: {
      table: {
        category: 'Animation controls',
      },
    },
    easing: {
      table: {
        category: 'Animation controls',
      },
    },
    transition: {
      options: ['squashable', 'shiftable'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Animation controls',
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
      <PanelContainer orientation="vertical">
        {Story()}
        <MainPanel>Main panel</MainPanel>
      </PanelContainer>
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
          <PageTitle src="components/Panels/SidePanel" title="SidePanel" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'The side panel sits alongside a MainPanel sibling in a vertical PanelContainer.',
      },
      source: {
        excludeDecorators: false,
      },
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SidePanel>;

const Template: ComponentStory<typeof SidePanel> = args => <SidePanel {...args} />;

const defaultArgs = {
  children: 'Side panel',
  duration: 300,
  fixed: false,
  open: true,
  position: 'left' as SidePanelProps['position'],
  transition: 'shiftable' as SidePanelProps['transition'],
  unit: 'px' as SidePanelProps['unit'],
  width: 200,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
