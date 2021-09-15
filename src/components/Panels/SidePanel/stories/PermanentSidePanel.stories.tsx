import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { MainPanel } from '../../MainPanel';
import { PanelContainer } from '../../PanelContainer';
import { PermanentSidePanel, PermanentSidePanelProps } from '../PermanentSidePanel';

export default {
  title: 'Surfaces/Panels/SidePanel/PermanentSidePanel',
  component: PermanentSidePanel,
  argTypes: {
    children: {
      control: { type: 'text' },
    },

    fixed: {
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
          <PageTitle src="components/Panels/PermanentSidePanel" title="PermanentSidePanel" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'The permanent side panel is a stripped down version of the SidePanel component without animation.',
      },
      source: {
        excludeDecorators: false,
      },
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PermanentSidePanel>;

const Template: ComponentStory<typeof PermanentSidePanel> = args => <PermanentSidePanel {...args} />;

const defaultArgs = {
  children: 'Side panel',
  fixed: false,
  position: 'left' as PermanentSidePanelProps['position'],
  unit: 'px' as PermanentSidePanelProps['unit'],
  width: 200,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
