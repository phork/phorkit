import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { ArrowUpDownIcon } from 'icons/ArrowUpDownIcon';
import { Button } from 'components/Button';
import { Card } from 'components/Card';
import { ColoredPaper } from 'components/Paper';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { InlineTooltip, InlineTooltipProps } from '../InlineTooltip';
import { getHorizontalPosition, getVerticalPosition } from './helpers/position';

export default {
  title: 'Surfaces/Tooltip/InlineTooltip',
  component: InlineTooltip,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    cornerTriangle: {
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
    triangleBorderColor: {
      table: {
        category: 'Appearance',
      },
    },
    triangleBorderWidth: {
      table: {
        category: 'Appearance',
      },
    },
    triangleColor: {
      table: {
        category: 'Appearance',
      },
    },
    triangleSize: {
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
    tooltipClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    uncentered: {
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
          <PageTitle src="compositions/Tooltip" title="InlineTooltip" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof InlineTooltip>;

const Template: ComponentStory<(args: InlineTooltipProps<HTMLButtonElement>) => ReturnType<typeof InlineTooltip>> =
  args => <InlineTooltip<HTMLButtonElement> {...args} />;

const defaultArgs = {
  alwaysRender: false,
  children: (
    <ColoredPaper contained scrollable colorId="P10" container="popover" scrollbar="small" themeId="light">
      <Typography as="div" size="small" variants="line-height-comfy">
        The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox
        jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy
        dog The quick brown fox jumped over the lazy dog
      </Typography>
    </ColoredPaper>
  ),
  closeDelay: 500,
  cornerTriangle: false,
  height: 84,
  focusable: false,
  hoverable: true,
  ignoreClickOutside: false,
  initialVisible: true,
  layout: 'vertical' as InlineTooltipProps['layout'],
  observe: false,
  permanent: false,
  toggler: (
    <Typography color="primary">
      <ArrowUpDownIcon scale="xlarge" />
    </Typography>
  ),
  triangleColor: themes.light['color-P10'],
  uncentered: false,
  width: 300,
  withoutTogglerFocusStyle: false,
  withPopoverTogglerProps: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  position: 'top-left',
};

/*
Default.parameters = {
  jest: ['InlineTooltip.test.js'],
};
*/

export const TopLeftPosition = Template.bind({});
TopLeftPosition.storyName = 'Position: Top left';
TopLeftPosition.args = {
  ...defaultArgs,
  position: 'top-left',
};

export const TopCenterPosition = Template.bind({});
TopCenterPosition.storyName = 'Position: Top center';
TopCenterPosition.args = {
  ...defaultArgs,
  position: 'top-center',
};

export const TopRightPosition = Template.bind({});
TopRightPosition.storyName = 'Position: Top right';
TopRightPosition.args = {
  ...defaultArgs,
  position: 'top-right',
};

export const BottomLeftPosition = Template.bind({});
BottomLeftPosition.storyName = 'Position: Bottom left';
BottomLeftPosition.args = {
  ...defaultArgs,
  position: 'bottom-left',
};

export const BottomCenterPosition = Template.bind({});
BottomCenterPosition.storyName = 'Position: Bottom center';
BottomCenterPosition.args = {
  ...defaultArgs,
  position: 'bottom-center',
};

export const BottomRightPosition = Template.bind({});
BottomRightPosition.storyName = 'Position: Bottom right';
BottomRightPosition.args = {
  ...defaultArgs,
  position: 'bottom-right',
};

export const LeftTopPosition = Template.bind({});
LeftTopPosition.storyName = 'Position: Left top';
LeftTopPosition.args = {
  ...defaultArgs,
  position: 'left-top',
};

export const LeftCenterPosition = Template.bind({});
LeftCenterPosition.storyName = 'Position: Left center';
LeftCenterPosition.args = {
  ...defaultArgs,
  position: 'left-center',
};

export const LeftBottomPosition = Template.bind({});
LeftBottomPosition.storyName = 'Position: Left bottom';
LeftBottomPosition.args = {
  ...defaultArgs,
  position: 'left-bottom',
};

export const RightTopPosition = Template.bind({});
RightTopPosition.storyName = 'Position: Right top';
RightTopPosition.args = {
  ...defaultArgs,
  position: 'right-top',
};

export const RightCenterPosition = Template.bind({});
RightCenterPosition.storyName = 'Position: Right center';
RightCenterPosition.args = {
  ...defaultArgs,
  position: 'right-center',
};

export const RightBottomPosition = Template.bind({});
RightBottomPosition.storyName = 'Position: Right bottom';
RightBottomPosition.args = {
  ...defaultArgs,
  position: 'right-bottom',
};

export const VerticalLayout = Template.bind({});
VerticalLayout.storyName = 'Layout: Vertical';
VerticalLayout.args = {
  ...defaultArgs,
  layout: 'vertical',
};

export const HorizontalLayout = Template.bind({});
HorizontalLayout.storyName = 'Layout: Horizontal';
HorizontalLayout.args = {
  ...defaultArgs,
  layout: 'horizontal',
};

export const CornerTriangle = Template.bind({});
CornerTriangle.storyName = 'Corner triangle';
CornerTriangle.args = {
  ...defaultArgs,
  cornerTriangle: true,
  position: 'left-top',
};

export const CornerTriangleUncentered = Template.bind({});
CornerTriangleUncentered.storyName = 'Corner triangle, uncentered';
CornerTriangleUncentered.args = {
  ...defaultArgs,
  cornerTriangle: true,
  position: 'left-top',
  uncentered: true,
};

export const TriangleSize = Template.bind({});
TriangleSize.storyName = 'Triangle size';
TriangleSize.args = {
  ...defaultArgs,
  offset: { horizontal: 42, vertical: 20 },
  position: 'bottom-right',
  triangleSize: 12,
};

export const ManualFocus = Template.bind({});
ManualFocus.storyName = 'With manual focus';
ManualFocus.args = {
  ...defaultArgs,
  children: undefined,
  focusable: true,
  initialVisible: false,
  height: 74,
  position: 'right-center',
  renderChildren: ({ focusRef }) => (
    <Card full raised>
      <ColoredPaper contained scrollable colorId="P10" container="popover" scrollbar="small" themeId="light">
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
      </ColoredPaper>
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
      <ColoredPaper contained scrollable colorId="P10" container="popover" scrollbar="small" themeId="light">
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
      </ColoredPaper>
    </Card>
  ),
  focusable: true,
  height: 74,
  initialVisible: false,
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
  hoverable: false,
  initialVisible: false,
  offset: { horizontal: 20 },
  position: 'right-center',
  renderChildren: ({ close, focusRef }) => (
    <ColoredPaper colorId="P10" style={{ borderRadius: '2px' }} themeId="light">
      <Button contrast onClick={() => close()} ref={focusRef} shape="brick" weight="ghost">
        Close
      </Button>
    </ColoredPaper>
  ),
  width: 'auto',
};
