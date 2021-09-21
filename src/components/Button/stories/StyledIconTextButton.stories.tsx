import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { SpinnerIcon } from 'icons/SpinnerIcon';
import { BlobbrIcon } from 'icons/internal/BlobbrIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledIconTextButton, StyledIconTextButtonProps } from '../StyledIconTextButton';
import buttonStory from './StyledButton.stories';

export default {
  ...buttonStory,
  title: 'Buttons/IconTextButton/StyledIconTextButton',
  component: StyledIconTextButton,
  argTypes: {
    icon: {
      options: ['small', 'medium', 'large'],
      control: {
        labels: {
          small: '<BlobbrIcon scale="small" />',
          medium: '<BlobbrIcon scale="medium" />',
          large: '<BlobbrIcon scale="large" />',
        },
      },
      table: {
        category: 'Icons',
      },
    },
    loaderReplaceIcon: {
      table: {
        category: 'Icons',
      },
    },
    reverse: {
      table: {
        category: 'Icons',
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
    args: Omit<StyledIconTextButtonProps, 'icon'> & { icon: 'small' | 'medium' | 'large' },
  ) => ReturnType<typeof StyledIconTextButton>
> = ({ children, icon = 'medium', size, ...args }) => (
  <StyledIconTextButton
    {...args}
    icon={<BlobbrIcon scale={icon} />}
    loader={<SpinnerIcon scale={icon} />}
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
