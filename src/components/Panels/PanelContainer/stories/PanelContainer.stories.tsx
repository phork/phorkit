import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { MainPanel } from '../../MainPanel';
import { PanelContainer, PanelContainerProps } from '../PanelContainer';

export default {
  title: 'Surfaces/Panels/PanelContainer',
  component: PanelContainer,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    absolute: {
      table: {
        category: 'Panel controls',
      },
    },
    full: {
      table: {
        category: 'Panel controls',
      },
    },
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Panel controls',
      },
    },
    reverse: {
      table: {
        category: 'Panel controls',
      },
    },
    viewport: {
      table: {
        category: 'Panel controls',
      },
    },

    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Panels/PanelContainer" title="PanelContainer" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component:
          'A panel container wraps a set of SidePanel or StackPanel components and one or more MainPanel components.',
      },
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PanelContainer>;

const Template: ComponentStory<typeof PanelContainer> = args => <PanelContainer {...args} />;

const defaultArgs = {
  children: [<MainPanel>Main panel 1</MainPanel>, <MainPanel>Main panel 2</MainPanel>],
  orientation: 'horizontal' as PanelContainerProps['orientation'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
