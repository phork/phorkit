import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { FormComponentDemo } from '../../stories/helpers/FormComponentDemo';
import { MultiColorSlider, MultiColorSliderProps } from '../MultiColorSlider';

export default {
  title: 'Form/Slider/MultiColorSlider',
  component: MultiColorSlider,
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
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Form/Slider" title="MultiColorSlider" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof MultiColorSlider>;

const Template: ComponentStory<typeof MultiColorSlider> = args => <MultiColorSlider {...args} />;

const defaultArgs = {
  colors: ['danger', 'warning', 'success', 'accent'],
  disabled: false,
  formatValue: (value?: number) => (value && ['danger', 'warning', 'success', 'accent'][value - 1]) || '-',
  persistEvents: false,
  value: 2,
  valuePosition: 'right' as MultiColorSliderProps['valuePosition'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['MultiColorSlider.test.js'],
};
*/
