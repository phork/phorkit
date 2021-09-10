import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from 'types';
import { SpinnerIcon } from 'icons/SpinnerIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledButton, StyledButtonProps } from '../StyledButton';
import buttonStory from './Button.stories';

export default {
  ...buttonStory,
  title: 'Buttons/Button/StyledButton',
  component: StyledButton,
  argTypes: {
    activePrimaryColor: {
      table: {
        category: 'Styled controls',
      },
    },
    hoveredPrimaryColor: {
      table: {
        category: 'Styled controls',
      },
    },
    inverseColor: {
      table: {
        category: 'Styled controls',
      },
    },
    primaryColor: {
      table: {
        category: 'Styled controls',
      },
    },
    width: {
      table: {
        category: 'Styled controls',
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
          <PageTitle src="components/Button" title="StyledButton" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledButton>;

const Template: ComponentStory<(args: StyledButtonProps) => ReturnType<typeof StyledButton>> = ({
  children,
  size,
  ...args
}) => (
  <StyledButton {...args} loader={<SpinnerIcon scale={size as IconScale} />} onClick={action('clicked')} size={size}>
    {children}
  </StyledButton>
);

const defaultArgs = {
  active: false,
  activePrimaryColor: '#798796',
  align: 'center' as StyledButtonProps['align'],
  as: 'button' as StyledButtonProps['as'],
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
  shape: 'pill' as StyledButtonProps['shape'],
  size: 'medium' as StyledButtonProps['size'],
  type: 'button' as StyledButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as StyledButtonProps['weight'],
  width: 120,
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
