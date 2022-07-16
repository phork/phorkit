import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ArrowUpDownIcon } from 'icons/ArrowUpDownIcon';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { Paper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { PortalPopover, PortalPopoverProps } from '../PortalPopover';
import { getHorizontalPosition, getVerticalPosition } from './helpers/position';

const defaultOffset = {
  horizontal: 0,
  vertical: 0,
};

export default {
  title: 'Surfaces/Popover/PortalPopover',
  component: PortalPopover,
  argTypes: {
    centered: {
      table: {
        category: 'Appearance',
      },
    },
    children: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    height: {
      table: {
        category: 'Appearance',
      },
    },
    layout: {
      table: {
        category: 'Appearance',
      },
    },
    offset: {
      table: {
        category: 'Appearance',
      },
    },
    portal: {
      table: {
        category: 'Appearance',
      },
    },
    position: {
      table: {
        category: 'Appearance',
      },
    },
    renderChildren: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    toggler: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    width: {
      table: {
        category: 'Appearance',
      },
    },

    closeDelay: {
      table: {
        category: 'Interaction',
      },
    },
    container: {
      table: {
        category: 'Interaction',
      },
    },
    focusable: {
      table: {
        category: 'Interaction',
      },
    },
    hoverable: {
      table: {
        category: 'Interaction',
      },
    },
    ignoreClickOutside: {
      table: {
        category: 'Interaction',
      },
    },
    initialVisible: {
      table: {
        category: 'Interaction',
      },
    },
    isTooltip: {
      table: {
        category: 'Interaction',
      },
    },
    observe: {
      table: {
        category: 'Interaction',
      },
    },
    permanent: {
      table: {
        category: 'Interaction',
      },
    },

    onClose: {
      table: {
        category: 'Actions',
      },
    },
    onOpen: {
      table: {
        category: 'Actions',
      },
    },

    alwaysRender: {
      table: {
        category: 'Uncommon',
      },
    },
    className: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    contentClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    contentStyle: {
      table: {
        category: 'Uncommon',
      },
    },
    style: {
      table: {
        category: 'Uncommon',
      },
    },
    themeId: {
      control: {
        disable: true,
      },
      table: {
        category: 'Uncommon',
      },
    },
    withPopoverTogglerProps: {
      table: {
        category: 'Uncommon',
      },
    },
    withoutTogglerFocusStyle: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    (Story, { args: { layout, position } }) => (
      <div
        style={{
          margin: 20,
          width: 380,
          height: layout === 'horizontal' || (position && /^(right|left)-/.test(position)) ? 90 : 140,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            ...getHorizontalPosition(position, layout),
            ...getVerticalPosition(position, layout),
          }}
        >
          {Story()}
        </div>
      </div>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Popover" title="PortalPopover" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof PortalPopover>;

const Template: ComponentStory<(args: PortalPopoverProps<HTMLButtonElement>) => ReturnType<typeof PortalPopover>> =
  args => <PortalPopover<HTMLButtonElement> {...args} />;

const defaultArgs = {
  alwaysRender: false,
  children: (
    <Paper contained scrollable color="accent" container="popover" scrollbar="small">
      <Typography as="div" size="small" variants="line-height-comfy">
        The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox
        jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy
        dog The quick brown fox jumped over the lazy dog
      </Typography>
    </Paper>
  ),
  centered: false,
  closeDelay: 500,
  height: 84,
  focusable: false,
  hoverable: false,
  ignoreClickOutside: false,
  initialVisible: true,
  isTooltip: false,
  layout: 'vertical' as PortalPopoverProps['layout'],
  observe: false,
  offset: defaultOffset,
  permanent: false,
  portal: 'absolute' as PortalPopoverProps['portal'],
  toggler: (
    <Typography color="primary">
      <ArrowUpDownIcon scale="xlarge" />
    </Typography>
  ),
  width: 300,
  withoutTogglerFocusStyle: false,
  withPopoverTogglerProps: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  position: 'top-left',
};

/*
Default.parameters = {
  jest: ['PortalPopover.test.js'],
};
*/

export const TopLeftPosition = Template.bind({});
TopLeftPosition.storyName = 'Position: Top left';
TopLeftPosition.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  position: 'top-left',
};

export const TopCenterPosition = Template.bind({});
TopCenterPosition.storyName = 'Position: Top center';
TopCenterPosition.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  position: 'top-center',
};

export const TopRightPosition = Template.bind({});
TopRightPosition.storyName = 'Position: Top right';
TopRightPosition.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  position: 'top-right',
};

export const BottomLeftPosition = Template.bind({});
BottomLeftPosition.storyName = 'Position: Bottom left';
BottomLeftPosition.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  position: 'bottom-left',
};

export const BottomCenterPosition = Template.bind({});
BottomCenterPosition.storyName = 'Position: Bottom center';
BottomCenterPosition.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  position: 'bottom-center',
};

export const BottomRightPosition = Template.bind({});
BottomRightPosition.storyName = 'Position: Bottom right';
BottomRightPosition.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  position: 'bottom-right',
};

export const LeftTopPosition = Template.bind({});
LeftTopPosition.storyName = 'Position: Left top';
LeftTopPosition.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  position: 'left-top',
};

export const LeftCenterPosition = Template.bind({});
LeftCenterPosition.storyName = 'Position: Left center';
LeftCenterPosition.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  position: 'left-center',
};

export const LeftBottomPosition = Template.bind({});
LeftBottomPosition.storyName = 'Position: Left bottom';
LeftBottomPosition.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  position: 'left-bottom',
};

export const RightTopPosition = Template.bind({});
RightTopPosition.storyName = 'Position: Right top';
RightTopPosition.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  position: 'right-top',
};

export const RightCenterPosition = Template.bind({});
RightCenterPosition.storyName = 'Position: Right center';
RightCenterPosition.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  position: 'right-center',
};

export const RightBottomPosition = Template.bind({});
RightBottomPosition.storyName = 'Position: Right bottom';
RightBottomPosition.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  position: 'right-bottom',
};

export const VerticalLayout = Template.bind({});
VerticalLayout.storyName = 'Layout: Vertical';
VerticalLayout.args = {
  ...defaultArgs,
  offset: { vertical: 8 },
  layout: 'vertical',
};

export const HorizontalLayout = Template.bind({});
HorizontalLayout.storyName = 'Layout: Horizontal';
HorizontalLayout.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  layout: 'horizontal',
};

export const AbsolutePortal = Template.bind({});
AbsolutePortal.storyName = 'Portal: Absolute';
AbsolutePortal.args = {
  ...defaultArgs,
  offset: { horizontal: 8 },
  portal: 'absolute',
  position: 'right-center',
};

export const FixedPortal = Template.bind({});
FixedPortal.storyName = 'Portal: Fixed';
FixedPortal.args = {
  ...defaultArgs,
  observe: true,
  offset: { horizontal: 8 },
  portal: 'fixed',
  position: 'right-center',
};

export const ManualFocus = Template.bind({});
ManualFocus.storyName = 'With manual focus';
ManualFocus.args = {
  ...defaultArgs,
  children: undefined,
  focusable: true,
  initialVisible: false,
  height: 74,
  offset: { horizontal: 8 },
  position: 'right-center',
  renderChildren: ({ focusRef }) => (
    <Card full raised>
      <Paper contained scrollable color="accent" container="popover" scrollbar="small">
        <Typography as="div" variants="reset">
          <Rhythm my={1}>
            <Button contrast onClick={() => console.log('clicked')} weight="inline">
              Unfocused button
            </Button>
            <Button contrast onClick={() => console.log('clicked')} ref={focusRef} weight="inline">
              Focused button
            </Button>
          </Rhythm>
        </Typography>
      </Paper>
    </Card>
  ),
  width: 150,
};

export const AutoFocus = Template.bind({});
AutoFocus.storyName = 'With auto focus';
AutoFocus.args = {
  ...defaultArgs,
  children: (
    <Card full raised>
      <Paper contained scrollable color="accent" container="popover" scrollbar="small">
        <Typography as="div" variants="reset">
          <Rhythm my={1}>
            <Button contrast onClick={() => console.log('clicked')} weight="inline">
              Focused button
            </Button>
            <Button contrast onClick={() => console.log('clicked')} weight="inline">
              Unfocused button
            </Button>
          </Rhythm>
        </Typography>
      </Paper>
    </Card>
  ),
  focusable: true,
  height: 74,
  initialVisible: false,
  offset: { horizontal: 8 },
  position: 'right-center',
  width: 150,
};

export const CloseButton = Template.bind({});
CloseButton.storyName = 'With close button';
CloseButton.args = {
  ...defaultArgs,
  children: undefined,
  focusable: true,
  height: 32,
  initialVisible: false,
  offset: { horizontal: 20 },
  position: 'right-center',
  renderChildren: ({ close, focusRef }) => (
    <Button color="primary" onClick={() => close()} ref={focusRef} shape="brick" weight="shaded">
      Close
    </Button>
  ),
  width: 150,
};
