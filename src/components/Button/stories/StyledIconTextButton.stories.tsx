import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { PageTitle } from 'stories/helpers/PageTitle';
import { SpinnerIcon } from '../../../icons/SpinnerIcon';
import { BlobbrIcon } from '../../../icons/internal/BlobbrIcon';
import { StyledIconTextButton, StyledIconTextButtonProps } from '../StyledIconTextButton';
import buttonStory from './StyledButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconTextButton/StyledIconTextButton',
  component: StyledIconTextButton,
  argTypes: {
    icon: {
      defaultValue: 'Medium',
      options: ['Small', 'Medium', 'Large'],
      mapping: {
        Small: <BlobbrIcon scale="small" />,
        Medium: <BlobbrIcon scale="medium" />,
        Large: <BlobbrIcon scale="large" />,
      },
      control: {
        labels: {
          Small: '<BlobbrIcon scale="small" />',
          Medium: '<BlobbrIcon scale="medium" />',
          Large: '<BlobbrIcon scale="large" />',
        },
      },
      table: {
        category: 'Icon controls',
      },
    },
    reverse: {
      table: {
        category: 'Icon controls',
      },
    },
    ...buttonStory.argTypes,
  },
  parameters: {
    ...buttonStory.parameters,
    docs: {
      ...buttonStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Button" title="StyledIconTextButton" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledIconTextButton>;

const Template: ComponentStory<
  (
    args: Omit<StyledIconTextButtonProps, 'icon'> & { icon: React.ReactElement },
  ) => ReturnType<typeof StyledIconTextButton>
> = ({ children, icon, size, ...args }) => (
  <StyledIconTextButton
    {...args}
    icon={icon}
    loader={<SpinnerIcon scale={icon.props.scale || 'medium'} />}
    onClick={action('clicked')}
    size={size}
  >
    {children}
  </StyledIconTextButton>
);

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  align: 'center' as StyledIconTextButtonProps['align'],
  as: 'button' as StyledIconTextButtonProps['as'],
  children: 'Click me',
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
  shape: 'pill' as StyledIconTextButtonProps['shape'],
  size: 'medium' as StyledIconTextButtonProps['size'],
  type: 'button' as StyledIconTextButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as StyledIconTextButtonProps['weight'],
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
