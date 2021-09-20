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
      control: { type: 'text' },
    },

    scale: {
      options: ['small', undefined],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    valuePosition: {
      options: ['top', 'right', undefined],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    width: {
      table: {
        category: 'Appearance controls',
      },
    },

    disabled: {
      table: {
        category: 'State controls',
      },
    },
    value: {
      table: {
        category: 'State controls',
      },
    },

    onChange: {
      table: {
        category: 'Action controls',
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
    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    formatValue: {
      table: {
        category: 'Uncommon controls',
      },
    },
    labelProps: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
    persistEvents: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
    unstyled: {
      table: {
        category: 'Uncommon controls',
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
      description: {
        component: 'A modified slider where colored segments are activated when in range.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof MultiColorSlider>;

const Template: ComponentStory<typeof MultiColorSlider> = args => <MultiColorSlider {...args} />;

const defaultArgs = {
  colors: ['danger', 'warning', 'success', 'accent-primary'],
  disabled: false,
  formatValue: (value?: number) => (value && ['danger', 'warning', 'success', 'accent-primary'][value - 1]) || '-',
  persistEvents: false,
  value: 2,
  valuePosition: 'right' as MultiColorSliderProps['valuePosition'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
