import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Label } from 'components/Form/Label';
import { Textbox } from 'components/Form/Textbox';
import { PageTitle } from 'stories/helpers/PageTitle';
import { LabelWrapper } from '../LabelWrapper';

export default {
  title: 'Form/LabelWrapper',
  component: LabelWrapper,
  argTypes: {
    input: {
      control: {
        disable: true,
      },
    },
    label: {
      control: {
        disable: true,
      },
    },

    fullWidth: {
      table: {
        category: 'Appearance controls',
      },
    },
    inputWidth: {
      table: {
        category: 'Appearance controls',
      },
    },
    labelWidth: {
      table: {
        category: 'Appearance controls',
      },
    },
    reverse: {
      table: {
        category: 'Appearance controls',
      },
    },
    spread: {
      table: {
        category: 'Appearance controls',
      },
    },
    vertical: {
      table: {
        category: 'Appearance controls',
      },
    },

    as: {
      table: {
        category: 'Uncommon controls',
      },
    },
    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
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
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Form/LabelWrapper" title="LabelWrapper" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'A component to position an input and a label relative to each other.',
      },
    },
    layout: 'padded',
  },
} as ComponentMeta<typeof LabelWrapper>;

const Template: ComponentStory<typeof LabelWrapper> = args => <LabelWrapper {...args} />;

const defaultArgs = {
  fullWidth: false,
  input: <Textbox value="Hello world" variant="filled" />,
  label: <Label strength="standard">Super awesome label</Label>,
  reverse: false,
  spread: false,
  vertical: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Reverse = Template.bind({});
Reverse.args = {
  ...defaultArgs,
  reverse: true,
};

export const FullWidth = Template.bind({});
FullWidth.storyName = 'Full width';
FullWidth.args = {
  ...defaultArgs,
  fullWidth: true,
  inputWidth: '100%',
  labelWidth: '200px',
};

export const Spread = Template.bind({});
Spread.args = {
  ...defaultArgs,
  fullWidth: true,
  spread: true,
};

export const Vertical = Template.bind({});
Vertical.args = {
  ...defaultArgs,
  vertical: true,
};

export const VerticalReverse = Template.bind({});
VerticalReverse.storyName = 'Vertical, reverse';
VerticalReverse.args = {
  ...defaultArgs,
  reverse: true,
  vertical: true,
};
