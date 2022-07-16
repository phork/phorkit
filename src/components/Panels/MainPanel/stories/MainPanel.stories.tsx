import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { PanelContainer } from '../../PanelContainer';
import { MainPanel } from '../MainPanel';

export default {
  title: 'Surfaces/Panels/MainPanel',
  component: MainPanel,
  argTypes: {
    children: {
      control: {
        disable: true,
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
          <PageTitle src="components/Panels/MainPanel" title="MainPanel" />
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
} as ComponentMeta<typeof MainPanel>;

const Template: ComponentStory<typeof MainPanel> = args => <MainPanel {...args} />;

const defaultArgs = {
  children: <Typography color="primary">Main panel</Typography>,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['MainPanel.test.js'],
};
*/
