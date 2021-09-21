import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { PanelContainer } from '../../PanelContainer';
import { MainPanel } from '../MainPanel';

export default {
  title: 'Surfaces/Panels/MainPanel',
  component: MainPanel,
  argTypes: {
    children: {
      control: { type: 'text' },
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
  decorators: [Story => <PanelContainer orientation="horizontal">{Story()}</PanelContainer>],
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
      description: {
        component:
          'The main panel stretches to fill the remainder of a panel container after accounting for SidePanel and StackPanel siblings.',
      },
      source: {
        excludeDecorators: false,
      },
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MainPanel>;

const Template: ComponentStory<typeof MainPanel> = args => <MainPanel {...args} />;

const defaultArgs = {
  children: 'Main panel',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
