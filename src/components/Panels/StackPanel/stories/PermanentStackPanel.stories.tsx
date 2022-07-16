import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { MainPanel } from '../../MainPanel';
import { PanelContainer } from '../../PanelContainer';
import { PermanentStackPanel, PermanentStackPanelProps } from '../PermanentStackPanel';

export default {
  title: 'Surfaces/Panels/StackPanel/PermanentStackPanel',
  component: PermanentStackPanel,
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
    height: {
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
      <PanelContainer orientation="horizontal" style={{ height: 100 }}>
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
          <PageTitle src="components/Panels/PermanentStackPanel" title="PermanentStackPanel" />
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
} as ComponentMeta<typeof PermanentStackPanel>;

const Template: ComponentStory<typeof PermanentStackPanel> = args => <PermanentStackPanel {...args} />;

const defaultArgs = {
  children: <Typography color="primary">Stack panel</Typography>,
  fixed: false,
  flexible: false,
  height: 40,
  position: 'left' as PermanentStackPanelProps['position'],
  raised: false,
  unit: 'px' as PermanentStackPanelProps['unit'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['PermanentStackPanel.test.js'],
};
*/
