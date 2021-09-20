import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledSlider } from '../StyledSlider';
import sliderStory from './Slider.stories';

export default {
  ...sliderStory,
  title: 'Form/Slider/StyledSlider',
  component: StyledSlider,
  argTypes: {
    handleBackgroundColor: {
      table: {
        category: 'Styled controls',
      },
    },
    tickBackgroundColor: {
      table: {
        category: 'Styled controls',
      },
    },
    trackBackgroundColor: {
      table: {
        category: 'Styled controls',
      },
    },
    trackFillBackgroundColor: {
      table: {
        category: 'Styled controls',
      },
    },
    ...sliderStory.argTypes,
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
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unstyled: { table: { disable: true } },
};
