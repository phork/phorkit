import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledSlider } from '../StyledSlider';
import sliderStory from './Slider.stories';

const argTypes = { ...sliderStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;
delete argTypes.validity;

export default {
  ...sliderStory,
  title: 'Form/Slider/StyledSlider',
  component: StyledSlider,
  argTypes: {
    handleBackgroundColor: {
      table: {
        category: 'Style',
      },
    },
    tickBackgroundColor: {
      table: {
        category: 'Style',
      },
    },
    trackBackgroundColor: {
      table: {
        category: 'Style',
      },
    },
    trackFillBackgroundColor: {
      table: {
        category: 'Style',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...sliderStory.parameters,
    docs: {
      ...sliderStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Slider" title="StyledSlider" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledSlider>;

const Template: ComponentStory<typeof StyledSlider> = args => <StyledSlider {...args} />;

const defaultArgs = {
  handleBackgroundColor: '#283992',
  tickBackgroundColor: '#e4e4e4',
  trackBackgroundColor: '#e4e4e4',
  trackFillBackgroundColor: '#642da0',
  tick: 20,
  value: 75,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  style: { table: { disable: true } },
  unstyled: { table: { disable: true } },
};
