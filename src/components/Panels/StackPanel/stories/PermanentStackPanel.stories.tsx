import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
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
        type: 'text',
      },
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
          <PageTitle src="components/Panels/PermanentStackPanel" title="PermanentStackPanel" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component:
          'The permanent stack panel is a stripped down version of the StackPanel component without animation.',
      },
      source: {
        excludeDecorators: false,
      },
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PermanentStackPanel>;

const Template: ComponentStory<typeof PermanentStackPanel> = args => <PermanentStackPanel {...args} />;

const defaultArgs = {
  children: 'Stack panel',
  fixed: false,
  height: 100,
  position: 'left' as PermanentStackPanelProps['position'],
  raised: false,
  unit: 'px' as PermanentStackPanelProps['unit'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
