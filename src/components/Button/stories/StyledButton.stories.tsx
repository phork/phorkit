import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { IconScale } from 'types';
import { SpinnerIcon } from 'icons/SpinnerIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledButton, StyledButtonProps } from '../StyledButton';
import buttonStory from './Button.stories';

const argTypes = { ...buttonStory.argTypes };
delete argTypes.color;
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...buttonStory,
  title: 'Buttons/Button/StyledButton',
  component: StyledButton,
  argTypes: {
    activePrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    hoveredPrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    inverseColor: {
      table: {
        category: 'Styled',
      },
    },
    primaryColor: {
      table: {
        category: 'Styled',
      },
    },
    width: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
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

/*
Default.parameters = {
  jest: ['StyledButton.test.js', 'Button.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  unstyled: { table: { disable: true } },
};
