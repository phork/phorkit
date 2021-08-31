import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { StyledIconButton, StyledIconButtonProps } from '../StyledIconButton';
import buttonStory from './StyledButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconButton/StyledIconButton',
  component: StyledIconButton,
  argTypes: {
    ...buttonStory.argTypes,
    children: {
      defaultValue: 'Medium',
      mapping: {
        Small: <BlobbrIcon scale="small" />,
        Medium: <BlobbrIcon scale="medium" />,
        Large: <BlobbrIcon scale="large" />,
        XLarge: <BlobbrIcon scale="xlarge" />,
      },
      control: {
        type: 'select',
        labels: {
          Small: '<BlobbrIcon scale="small" />',
          Medium: '<BlobbrIcon scale="medium" />',
          Large: '<BlobbrIcon scale="large" />',
          XLarge: '<BlobbrIcon scale="xlarge" />',
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
    args: Omit<StyledIconButtonProps, 'children'> & { children: React.ReactElement },
  ) => ReturnType<typeof StyledIconButton>
> = ({ children, size, ...args }) => (
  <StyledIconButton
    {...args}
    loader={<SpinnerIcon scale={children.props.scale || 'medium'} />}
    onClick={action('clicked')}
    size={size}
  >
    {children}
  </StyledIconButton>
);

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  align: 'center' as StyledIconButtonProps['align'],
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
