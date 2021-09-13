import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { MoonIcon } from 'icons/internal/MoonIcon';
import { SunIcon } from 'icons/internal/SunIcon';
import { Rhythm } from 'components/Rhythm';
import { Button } from '../Button';
import { ButtonGroupProps, ButtonGroup } from '../ButtonGroup';
import { IconButton } from '../IconButton';
import { IconTextButton } from '../IconTextButton';
import ButtonGroupDocumentation from './ButtonGroup.docs.mdx';

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    onClick: {
      control: {
        disable: true,
      },
    },
    align: {
      options: ['left', 'center', 'right'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    color: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral', 'black', 'white'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    shape: {
      options: ['pill', 'brick'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    spacing: {
      options: ['divided', 'joined', 'cozy', 'comfy'],
      control: { type: 'inline-radio' },
      table: {
        category: 'Appearance controls',
      },
    },
    weight: {
      options: ['solid', 'shaded', 'outlined', 'ghost', 'inline'],
      control: { type: 'radio' },
      table: {
        category: 'Appearance controls',
      },
    },

    selectedColor: {
      options: ['primary', 'success', 'warning', 'danger', 'neutral', 'black', 'white', undefined],
      control: { type: 'radio' },
      table: {
        category: 'Selected controls',
      },
    },
    selectedStyle: {
      table: {
        category: 'Uncommon controls',
      },
    },
    selectedWeight: {
      options: ['solid', 'shaded', 'outlined', 'ghost', 'inline', undefined],
      control: { type: 'radio' },
      table: {
        category: 'Selected controls',
      },
    },

    children: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon controls',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    fullWidth: {
      table: {
        category: 'Uncommon controls',
      },
    },
    style: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['className', 'ref', 'themeId'],
      sort: 'requiredFirst',
    },
    docs: {
      page: ButtonGroupDocumentation,
      description: {
        component: 'A simple text button or a link that looks like a button.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<(args: ButtonGroupProps) => ReturnType<typeof ButtonGroup>>;

const Template: ComponentStory<(args: ButtonGroupProps) => ReturnType<typeof ButtonGroup>> = ({
  children,
  ...args
}) => (
  <ButtonGroup {...args} onClick={action('clicked')}>
    {children}
  </ButtonGroup>
);

const defaultArgs = {
  align: 'center' as ButtonGroupProps['align'],
  buttons: [
    { id: 'first', label: 'First' },
    { id: 'second', label: 'Second', selected: true },
    { id: 'third', label: 'Third' },
    { id: 'fourth', label: 'Fourth' },
  ],
  color: 'primary' as ButtonGroupProps['color'],
  orientation: 'horizontal' as ButtonGroupProps['orientation'],
  selectedWeight: 'solid' as ButtonGroupProps['weight'],
  shape: 'pill' as ButtonGroupProps['shape'],
  size: 'medium' as ButtonGroupProps['size'],
  spacing: 'joined' as ButtonGroupProps['spacing'],
  weight: 'outlined' as ButtonGroupProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

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

export const PillShape = Template.bind({});
PillShape.storyName = 'Shape: Pill';
PillShape.args = {
  ...defaultArgs,
  shape: 'pill',
};

export const BrickShape = Template.bind({});
BrickShape.storyName = 'Shape: Brick';
BrickShape.args = {
  ...defaultArgs,
  shape: 'brick',
};

export const DividedSpacing = Template.bind({});
DividedSpacing.storyName = 'Spacing: Divided';
DividedSpacing.args = {
  ...defaultArgs,
  selectedStyle: { opacity: 0.8 },
  spacing: 'divided',
  weight: 'solid',
};

export const JoinedSpacing = Template.bind({});
JoinedSpacing.storyName = 'Spacing: Joined';
JoinedSpacing.args = {
  ...defaultArgs,
  spacing: 'joined',
};

export const CozySpacing = Template.bind({});
CozySpacing.storyName = 'Spacing: Cozy';
CozySpacing.args = {
  ...defaultArgs,
  shape: 'brick',
  size: 'small',
  spacing: 'cozy',
  weight: 'ghost',
};

export const ComfySpacing = Template.bind({});
ComfySpacing.storyName = 'Spacing: Comfy';
ComfySpacing.args = {
  ...defaultArgs,
  shape: 'brick',
  size: 'large',
  spacing: 'comfy',
  weight: 'ghost',
};

export const SolidWeight = Template.bind({});
SolidWeight.storyName = 'Weight: Solid';
SolidWeight.args = {
  ...defaultArgs,
  selectedStyle: { opacity: 0.8 },
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
  selectedWeight: 'shaded',
  weight: 'outlined',
};

export const GhostWeight = Template.bind({});
GhostWeight.storyName = 'Weight: Ghost';
GhostWeight.args = {
  ...defaultArgs,
  selectedWeight: 'shaded',
  shape: 'brick',
  spacing: 'cozy',
  weight: 'ghost',
};

export const InlineWeight = Template.bind({});
InlineWeight.storyName = 'Weight: Inline';
InlineWeight.args = {
  ...defaultArgs,
  color: 'neutral',
  selectedColor: 'primary',
  selectedWeight: 'inline',
  spacing: 'comfy',
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

export const HorizontalOrientation = Template.bind({});
HorizontalOrientation.storyName = 'Orientation: Horizontal';
HorizontalOrientation.args = {
  ...defaultArgs,
  orientation: 'horizontal',
};

export const VerticalOrientation = Template.bind({});
VerticalOrientation.storyName = 'Orientation: Vertical';
VerticalOrientation.args = {
  ...defaultArgs,
  align: 'left',
  orientation: 'vertical',
  shape: 'brick',
};

export const Children = Template.bind({});
Children.storyName = 'Using Button children';
Children.args = {
  children: [
    <Button color="primary" data-value="first" key="first" shape="brick" weight="outlined">
      First
    </Button>,
    <Button color="primary" data-value="second" key="second" shape="brick" weight="solid">
      Second
    </Button>,
    <Button color="primary" data-value="third" key="third" shape="brick" weight="outlined">
      Third
    </Button>,
    <Button color="primary" data-value="fourth" key="fourth" shape="brick" weight="outlined">
      Fourth
    </Button>,
  ],
  spacing: 'joined',
};

export const IconTextChildren = Template.bind({});
IconTextChildren.storyName = 'Using IconTextButton children';
IconTextChildren.args = {
  children: [
    <IconTextButton color="primary" icon={<SunIcon scale="medium" />} key="first" shape="brick" weight="outlined">
      First
    </IconTextButton>,
    <IconTextButton color="primary" icon={<MoonIcon scale="medium" />} key="second" shape="brick" weight="solid">
      Second
    </IconTextButton>,
    <IconTextButton color="primary" icon={<SunIcon scale="medium" />} key="third" shape="brick" weight="outlined">
      Third
    </IconTextButton>,
    <IconTextButton color="primary" icon={<SunIcon scale="medium" />} key="fourth" shape="brick" weight="outlined">
      Fourth
    </IconTextButton>,
  ],
  spacing: 'joined',
};

export const IconChildren = Template.bind({});
IconChildren.storyName = 'Using IconButton children';
IconChildren.args = {
  children: [
    <IconButton color="primary" key="sun" shape="square" weight="outlined">
      <SunIcon size={14} />
    </IconButton>,
    <IconButton color="primary" key="moon" shape="square" weight="solid">
      <MoonIcon size={14} />
    </IconButton>,
  ],
  spacing: 'joined',
};

export const Icons = Template.bind({});
Icons.storyName = 'With custom labels';
Icons.args = {
  ...defaultArgs,
  buttons: [
    {
      id: 'sun',
      label: (
        <Rhythm mx={2} my={2}>
          <SunIcon size={14} />
        </Rhythm>
      ),
      noPadding: true,
    },
    {
      id: 'moon',
      label: (
        <Rhythm mx={2} my={2}>
          <MoonIcon size={14} />
        </Rhythm>
      ),
      selected: true,
      noPadding: true,
    },
  ],
  size: 'small',
  shape: 'brick',
  spacing: 'joined',
};
