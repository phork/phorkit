import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { SpinnerIcon } from 'icons/SpinnerIcon';
import { BlobbrIcon } from 'icons/internal/BlobbrIcon';
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
          small: '<BlobbrIcon scale="small" />',
          medium: '<BlobbrIcon scale="medium" />',
          large: '<BlobbrIcon scale="large" />',
          xlarge: '<BlobbrIcon scale="xlarge" />',
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
    <BlobbrIcon scale={children} />
  </StyledIconButton>
);

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  as: 'button' as StyledIconButtonProps['as'],
  color: undefined,
  disabled: false,
  focused: false,
  fullWidth: false,
  hoveredPrimaryColor: '#454f58',
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

Default.argTypes = {
  color: { table: { disable: true } },
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  unstyled: { table: { disable: true } },
};
