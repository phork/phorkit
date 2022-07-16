import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Label } from 'components/Form/Label';
import { Textbox } from 'components/Form/Textbox';
import { PageTitle } from 'stories/helpers/PageTitle';
import { LabelWrapper, LabelWrapperProps } from '../LabelWrapper';

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
        category: 'Appearance',
      },
    },
    inputWidth: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },
    labelWidth: {
      table: {
        category: 'Appearance',
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
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
    spread: {
      table: {
        category: 'Appearance',
      },
    },

    as: {
      table: {
        category: 'Uncommon',
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
          <PageTitle src="components/Form/LabelWrapper" title="LabelWrapper" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
    layout: 'padded',
  },
} as ComponentMeta<typeof LabelWrapper>;

const Template: ComponentStory<typeof LabelWrapper> = args => <LabelWrapper {...args} />;

const defaultArgs = {
  fullWidth: false,
  input: <Textbox value="Hello world" variant="filled" />,
  label: <Label strength="standard">Super awesome label</Label>,
  orientation: 'horizontal' as LabelWrapperProps['orientation'],
  reverse: false,
  spread: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['LabelWrapper.test.js'],
};
*/

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

export const HorizontalOrientation = Template.bind({});
(HorizontalOrientation.storyName = 'Orientation: Horizontal'),
  (HorizontalOrientation.args = {
    ...defaultArgs,
    orientation: 'horizontal',
  });

export const HorizontalOrientationReverse = Template.bind({});
HorizontalOrientationReverse.storyName = 'Orientation: Horizontal, reverse';
HorizontalOrientationReverse.args = {
  ...defaultArgs,
  orientation: 'horizontal',
  reverse: true,
};

export const VerticalOrientation = Template.bind({});
(VerticalOrientation.storyName = 'Orientation: Vertical'),
  (VerticalOrientation.args = {
    ...defaultArgs,
    orientation: 'vertical',
  });

export const VerticalOrientationReverse = Template.bind({});
VerticalOrientationReverse.storyName = 'Orientation: Vertical, reverse';
VerticalOrientationReverse.args = {
  ...defaultArgs,
  orientation: 'vertical',
  reverse: true,
};
