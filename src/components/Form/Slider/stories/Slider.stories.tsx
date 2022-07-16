import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { Slider, SliderProps } from '../Slider';
import SliderDocumentation from './Slider.docs.mdx';

export default {
  title: 'Form/Slider',
  component: Slider,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    scale: {
      options: ['small', undefined],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    snap: {
      table: {
        category: 'Appearance',
      },
    },
    snapNext: {
      table: {
        category: 'Appearance',
      },
    },
    tick: {
      table: {
        category: 'Appearance',
      },
    },
    validity: {
      options: ['success', 'warning', 'danger', undefined],
      table: {
        category: 'Appearance',
      },
    },
    valuePosition: {
      options: ['top', 'right', undefined],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    width: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Appearance',
      },
    },

    disabled: {
      table: {
        category: 'Input',
      },
    },
    id: {
      table: {
        category: 'Input',
      },
    },
    max: {
      table: {
        category: 'Input',
      },
    },
    min: {
      table: {
        category: 'Input',
      },
    },
    name: {
      table: {
        category: 'Input',
      },
    },
    step: {
      table: {
        category: 'Input',
      },
    },
    value: {
      table: {
        category: 'Input',
      },
    },

    onChange: {
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
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    formatValue: {
      table: {
        category: 'Uncommon',
      },
    },
    labelProps: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    persistEvents: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
      table: {
        category: 'Uncommon',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    tickElement: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    trackElement: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    trackProps: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    tickProps: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    unstyled: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    (Story, { args }) => (
      <FormComponentDemo initialValue={args.value} property="value" type="slider">
        {Story()}
      </FormComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['aria-label'],
      sort: 'requiredFirst',
    },
    docs: {
      page: SliderDocumentation,
    },
  },
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = args => <Slider {...args} />;

const defaultArgs = {
  'aria-label': 'Super fantastic label',
  contrast: false,
  disabled: false,
  min: 0,
  max: 100,
  persistEvents: false,
  snap: false,
  snapNext: false,
  step: 1,
  unstyled: false,
  value: 75,
  valuePosition: 'right' as SliderProps['valuePosition'],
  width: '100%',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  children: 'Super fantastic label',
};

/*
Default.parameters = {
  jest: ['Slider.test.js'],
};
*/

export const RightValuePosition = Template.bind({});
RightValuePosition.storyName = 'Value position: Right';
RightValuePosition.args = {
  ...defaultArgs,
  children: 'Super fantastic label',
  valuePosition: 'right',
};

export const TopValuePosition = Template.bind({});
TopValuePosition.storyName = 'Value position: Top';
TopValuePosition.args = {
  ...defaultArgs,
  children: 'Super fantastic label',
  valuePosition: 'top',
};

export const NoValuePosition = Template.bind({});
NoValuePosition.storyName = 'Value position: None';
NoValuePosition.args = {
  ...defaultArgs,
  valuePosition: undefined,
};

export const SmallScale = Template.bind({});
SmallScale.storyName = 'Scale: Small';
SmallScale.args = {
  ...defaultArgs,
  scale: 'small',
};

export const NegativeValues = Template.bind({});
NegativeValues.storyName = 'Negative values';
NegativeValues.args = {
  ...defaultArgs,
  max: 0,
  min: -40,
  value: -10,
  valuePosition: 'right',
};

export const Ticked = Template.bind({});
Ticked.args = {
  ...defaultArgs,
  step: 1,
  tick: 10,
  value: 75,
};

export const TickedSnapped = Template.bind({});
TickedSnapped.storyName = 'Ticked, snapped';
TickedSnapped.args = {
  ...defaultArgs,
  max: 2,
  min: 0,
  snap: true,
  step: 0.5,
  tick: 0.5,
  value: 1.5,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  children: 'Super fantastic label',
  disabled: true,
};

export const SuccessValidity = Template.bind({});
SuccessValidity.storyName = 'Validity: Success';
SuccessValidity.args = {
  ...defaultArgs,
  children: 'Super fantastic label',
  validity: 'success',
};

export const WarningValidity = Template.bind({});
WarningValidity.storyName = 'Validity: Warning';
WarningValidity.args = {
  ...defaultArgs,
  children: 'Super fantastic label',
  validity: 'warning',
};

export const DangerValidity = Template.bind({});
DangerValidity.storyName = 'Validity: Danger';
DangerValidity.args = {
  ...defaultArgs,
  children: 'Super fantastic label',
  validity: 'danger',
};
