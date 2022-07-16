import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { MainPanel } from '../../MainPanel';
import { PanelContainer } from '../../PanelContainer';
import { PermanentSidePanel, PermanentSidePanelProps } from '../PermanentSidePanel';

export default {
  title: 'Surfaces/Panels/SidePanel/PermanentSidePanel',
  component: PermanentSidePanel,
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
    flexible: {
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
          <PageTitle src="components/Panels/PermanentSidePanel" title="PermanentSidePanel" />
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
} as ComponentMeta<typeof PermanentSidePanel>;

const Template: ComponentStory<typeof PermanentSidePanel> = args => <PermanentSidePanel {...args} />;

const defaultArgs = {
  children: <Typography color="primary">Side panel</Typography>,
  fixed: false,
  flexible: false,
  position: 'left' as PermanentSidePanelProps['position'],
  raised: false,
  style: { height: 100 },
  unit: 'px' as PermanentSidePanelProps['unit'],
  width: 200,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['PermanentSidePanel.test.js'],
};
*/
