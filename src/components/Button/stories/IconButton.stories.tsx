import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { SpinnerIcon } from 'icons/SpinnerIcon';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { IconButtonProps, IconButton } from '../IconButton';
import buttonStory from './Button.stories';
import IconButtonDocumentation from './IconButton.docs.mdx';

export default {
  ...buttonStory,
  title: 'Buttons/IconButton',
  component: IconButton,
  argTypes: {
    ...buttonStory.argTypes,
    align: {
      table: {
        disable: true,
      },
    },
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
      page: IconButtonDocumentation,
    },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<
  (
    args: Omit<IconButtonProps, 'children'> & { children: 'small' | 'medium' | 'large' | 'xlarge' },
  ) => ReturnType<typeof IconButton>
> = ({ children = 'medium', size, ...args }) => (
  <IconButton<'button'>
    {...args}
    as="button"
    loader={<SpinnerIcon scale={children} />}
    onClick={action('clicked')}
    size={size}
  >
    <CheckIcon scale={children} />
  </IconButton>
);

const defaultArgs = {
  active: false,
  as: 'button' as IconButtonProps['as'],
  color: 'primary' as IconButtonProps['color'],
  contrast: false,
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  imitation: false,
  loading: false,
  noHeight: false,
  noPadding: false,
  shape: 'circle' as IconButtonProps['shape'],
  size: 'medium' as IconButtonProps['size'],
  type: 'button' as IconButtonProps['type'],
  unstyled: false,
  unthemed: false,
  weight: 'solid' as IconButtonProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['IconButton.test.js'],
};
*/

export const PrimaryColor = Template.bind({});
PrimaryColor.storyName = 'Color: Primary';
PrimaryColor.args = {
  ...defaultArgs,
  color: 'primary',
};

export const SuccessColor = Template.bind({});
SuccessColor.storyName = 'Color: Success';
SuccessColor.args = {
  ...defaultArgs,
  color: 'success',
};

export const WarningColor = Template.bind({});
WarningColor.storyName = 'Color: Warning';
WarningColor.args = {
  ...defaultArgs,
  color: 'warning',
};

export const DangerColor = Template.bind({});
DangerColor.storyName = 'Color: Danger';
DangerColor.args = {
  ...defaultArgs,
  color: 'danger',
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
};

export const BlackColor = Template.bind({});
BlackColor.storyName = 'Color: Black';
BlackColor.args = {
  ...defaultArgs,
  color: 'black',
};

export const WhiteColor = Template.bind({});
WhiteColor.storyName = 'Color: White';
WhiteColor.args = {
  ...defaultArgs,
  color: 'white',
};

export const CircleShape = Template.bind({});
CircleShape.storyName = 'Shape: Circle';
CircleShape.args = {
  ...defaultArgs,
  shape: 'circle',
};

export const SquareShape = Template.bind({});
SquareShape.storyName = 'Shape: Square';
SquareShape.args = {
  ...defaultArgs,
  shape: 'square',
};

export const SolidWeight = Template.bind({});
SolidWeight.storyName = 'Weight: Solid';
SolidWeight.args = {
  ...defaultArgs,
  weight: 'solid',
};

export const ShadedWeight = Template.bind({});
ShadedWeight.storyName = 'Weight: Shaded';
ShadedWeight.args = {
  ...defaultArgs,
  weight: 'shaded',
};

export const OutlinedWeight = Template.bind({});
OutlinedWeight.storyName = 'Weight: Outlined';
OutlinedWeight.args = {
  ...defaultArgs,
  weight: 'outlined',
};

export const GhostWeight = Template.bind({});
GhostWeight.storyName = 'Weight: Ghost';
GhostWeight.args = {
  ...defaultArgs,
  weight: 'ghost',
};

export const InlineWeight = Template.bind({});
InlineWeight.storyName = 'Weight: Inline';
InlineWeight.args = {
  ...defaultArgs,
  children: 'xlarge',
  weight: 'inline',
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  size: 'small',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  size: 'medium',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  size: 'large',
};

export const XLargeSize = Template.bind({});
XLargeSize.storyName = 'Size: XLarge';
XLargeSize.args = {
  ...defaultArgs,
  size: 'xlarge',
};

export const XXLargeSize = Template.bind({});
XXLargeSize.storyName = 'Size: 2XLarge';
XXLargeSize.args = {
  ...defaultArgs,
  size: '2xlarge',
};

export const XXXLargeSize = Template.bind({});
XXXLargeSize.storyName = 'Size: 3XLarge';
XXXLargeSize.args = {
  ...defaultArgs,
  size: '3xlarge',
};

export const XXXXLargeSize = Template.bind({});
XXXXLargeSize.storyName = 'Size: 4XLarge';
XXXXLargeSize.args = {
  ...defaultArgs,
  size: '4xlarge',
};

export const XXXXXLargeSize = Template.bind({});
XXXXXLargeSize.storyName = 'Size: 5XLarge';
XXXXXLargeSize.args = {
  ...defaultArgs,
  size: '5xlarge',
};

export const ActiveState = Template.bind({});
ActiveState.storyName = 'State: Active';
ActiveState.args = {
  ...defaultArgs,
  active: true,
};

export const FocusedState = Template.bind({});
FocusedState.storyName = 'State: Focused';
FocusedState.args = {
  ...defaultArgs,
  focused: true,
};

export const HoveredState = Template.bind({});
HoveredState.storyName = 'State: Hovered';
HoveredState.args = {
  ...defaultArgs,
  hovered: true,
};

export const LoadingState = Template.bind({});
LoadingState.storyName = 'State: Loading';
LoadingState.args = {
  ...defaultArgs,
  loading: true,
};

export const Link = ({
  children,
  ...args
}: Omit<IconButtonProps<'a'>, 'children'> & { children: React.ReactElement }) => (
  <IconButton<'a'> {...args}>
    <CheckIcon scale={children?.props.scale || 'medium'} />
  </IconButton>
);
Link.args = {
  ...defaultArgs,
  as: 'a',
  href: 'https://phorkit.org',
  target: '_blank',
};

Link.argTypes = {
  href: { table: { disable: false } },
  target: { table: { disable: false } },
};

export const Imitation = ({
  children,
  ...args
}: Omit<IconButtonProps<'div'>, 'children'> & { children: React.ReactElement }) => (
  <IconButton<'div'> {...args}>
    <CheckIcon scale={children?.props.scale || 'medium'} />
  </IconButton>
);
Imitation.args = {
  ...defaultArgs,
  as: 'div',
  imitation: true,
};
