import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { MainPanel } from '../../MainPanel';
import { PanelContainer } from '../../PanelContainer';
import { SidePanel, SidePanelProps } from '../SidePanel';

export default {
  title: 'Surfaces/Panels/SidePanel',
  component: SidePanel,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    fixed: {
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
      options: ['left', 'right'],
      control: {
        type: 'inline-radio',
      },
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
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    width: {
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
      control: {
        type: 'inline-radio',
      },
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
      <PanelContainer orientation="vertical">
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
          <PageTitle src="components/Panels/SidePanel" title="SidePanel" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      source: {
        excludeDecorators: false,
      },
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SidePanel>;

const Template: ComponentStory<typeof SidePanel> = args => <SidePanel {...args} />;

const defaultArgs = {
  children: <Typography color="primary">Side panel</Typography>,
  duration: 300,
  fixed: false,
  open: true,
  position: 'left' as SidePanelProps['position'],
  raised: false,
  style: { height: 100 },
  transition: 'shiftable' as SidePanelProps['transition'],
  unit: 'px' as SidePanelProps['unit'],
  width: 200,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['SidePanel.test.js'],
};
*/
