import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography';
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
        category: 'Appearance',
      },
    },
    full: {
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      options: ['vertical', 'horizontal'],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    reverse: {
      table: {
        category: 'Appearance',
      },
    },
    viewport: {
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
  parameters: {
    controls: {
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
    },
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof PanelContainer>;

const Template: ComponentStory<typeof PanelContainer> = args => <PanelContainer {...args} />;

const defaultArgs = {
  absolute: false,
  children: [
    <MainPanel key="panel1">
      <Typography color="primary">Main panel 1</Typography>
    </MainPanel>,
    <MainPanel key="panel2">
      <Typography color="primary">Main panel 2</Typography>
    </MainPanel>,
  ],
  full: false,
  orientation: 'horizontal' as PanelContainerProps['orientation'],
  reverse: false,
  style: { height: 100 },
  viewport: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['PanelContainer.test.js'],
};
*/
