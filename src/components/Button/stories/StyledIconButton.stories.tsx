import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { SpinnerIcon } from 'icons/SpinnerIcon';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledIconButton, StyledIconButtonProps } from '../StyledIconButton';
import buttonStory from './StyledButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconButton/StyledIconButton',
  component: StyledIconButton,
  argTypes: {
    ...buttonStory.argTypes,
    children: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: {
        labels: {
          small: '<CheckIcon scale="small" />',
          medium: '<CheckIcon scale="medium" />',
          large: '<CheckIcon scale="large" />',
          xlarge: '<CheckIcon scale="xlarge" />',
        },
      },
    },
    shape: {
      ...buttonStory.argTypes?.shape,
      options: [undefined, 'circle', 'square'],
    },
  },
  parameters: {
    ...buttonStory.parameters,
    docs: {
      ...buttonStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Button" title="StyledIconButton" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledIconButton>;

const Template: ComponentStory<
  (
    args: Omit<StyledIconButtonProps, 'children'> & { children: 'small' | 'medium' | 'large' | 'xlarge' },
  ) => ReturnType<typeof StyledIconButton>
> = ({ children = 'medium', size, ...args }) => (
  <StyledIconButton {...args} loader={<SpinnerIcon scale={children} />} onClick={action('clicked')} size={size}>
    <CheckIcon scale={children} />
  </StyledIconButton>
);

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  as: 'button' as StyledIconButtonProps['as'],
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  hoveredPrimaryColor: '#454f58',
  imitation: false,
  inverseColor: '#fff',
  loading: false,
  noHeight: false,
  noPadding: false,
  primaryColor: '#556270',
  shape: 'circle' as StyledIconButtonProps['shape'],
  size: 'medium' as StyledIconButtonProps['size'],
  type: 'button' as StyledIconButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as StyledIconButtonProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledIconButton.test.js', 'IconButton.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  unstyled: { table: { disable: true } },
};
