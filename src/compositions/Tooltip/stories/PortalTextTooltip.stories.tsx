import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ArrowUpDownIcon } from 'icons/ArrowUpDownIcon';
import { IconButton } from 'components/Button/IconButton';
import { LinkContainer } from 'components/Link/LinkContainer';
import { Rhythm } from 'components/Rhythm/Rhythm';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { PortalTextTooltip, PortalTextTooltipProps } from '../PortalTextTooltip';
import { getHorizontalPosition, getVerticalPosition } from './helpers/position';

export default {
  title: 'Surfaces/Tooltip/PortalTextTooltip',
  component: PortalTextTooltip,
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
    triangleBorderWidth: {
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
    scrollable: {
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
    contrast: {
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
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Tooltip" title="PortalTextTooltip" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof PortalTextTooltip>;

const Template: ComponentStory<
  (args: PortalTextTooltipProps<HTMLButtonElement>) => ReturnType<typeof PortalTextTooltip>
> = args => <PortalTextTooltip<HTMLButtonElement> {...args} />;

const defaultArgs = {
  alwaysRender: false,
  children: 'Hello world',
  closeDelay: 500,
  contrast: false,
  cornerTriangle: false,
  focusable: true,
  hoverable: true,
  ignoreClickOutside: false,
  initialVisible: true,
  layout: 'vertical' as PortalTextTooltipProps['layout'],
  observe: false,
  permanent: false,
  portal: 'absolute' as PortalTextTooltipProps['portal'],
  position: 'top-center' as PortalTextTooltipProps['position'],
  scrollable: false,
  toggler: (
    <Typography color="primary">
      <ArrowUpDownIcon scale="xlarge" />
    </Typography>
  ),
  triangleBorderWidth: 2,
  uncentered: false,
  withoutTogglerFocusStyle: false,
  withPopoverTogglerProps: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  width: 100,
};

/*
Default.parameters = {
  jest: ['PortalTextTooltip.test.js'],
};
*/

Default.decorators = [
  (Story, { args: { layout, position } }) => (
    <div
      style={{
        margin: 20,
        width: 380,
        height: layout === 'horizontal' || (position && /^(right|left)-/.test(position)) ? 60 : 90,
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
];

export const OnText = Template.bind({});
OnText.storyName = 'On text';
OnText.args = {
  ...defaultArgs,
  children: (
    <React.Fragment>
      <p style={{ marginTop: 0 }}>
        The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox
        jumped over the lazy dog.
      </p>
      <LinkContainer>
        <p>
          <a href="#linked">I am a focused link</a>.
        </p>
      </LinkContainer>
      <p style={{ marginBottom: 0 }}>
        The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox
        jumped over the lazy dog.
      </p>
    </React.Fragment>
  ),
  closeDelay: 0,
  toggler: (
    <Typography color="accent" variants={['space-after', 'space-before']}>
      I am a friendly tooltip with a link.
    </Typography>
  ),
};

OnText.decorators = [
  (Story, { args: { position, layout } }) => (
    <Typography<'div'>
      as="div"
      color="primary"
      style={{
        margin: 20,
        height: 180,
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
    </Typography>
  ),
];

export const OnIcon = Template.bind({});
OnIcon.storyName = 'On an icon';
OnIcon.args = {
  ...defaultArgs,
  children: 'Tiny little portal tooltip. Hardly bigger than an acorn.',
  hoverable: false,
  toggler: (
    <Rhythm mx={1}>
      <IconButton color="primary">
        <ArrowUpDownIcon scale="medium" />
      </IconButton>
    </Rhythm>
  ),
  withoutTogglerFocusStyle: true,
};

OnIcon.decorators = [
  (Story, { args: { position, layout } }) => (
    <Typography<'div'>
      as="div"
      color="primary"
      style={{
        margin: 20,
        height: 60,
        position: 'relative',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          position: 'absolute',
          ...getHorizontalPosition(position, layout),
          ...getVerticalPosition(position, layout),
        }}
      >
        <span>Sometimes a tooltip should be clickable, or on an icon.</span>
        {Story()}
        <span>That is neat.</span>
      </div>
    </Typography>
  ),
];

export const NoTriangle = Template.bind({});
NoTriangle.storyName = 'No triangle';
NoTriangle.args = {
  ...defaultArgs,
  children: 'Tiny little portal tooltip. Hardly bigger than an acorn.',
  hoverable: false,
  toggler: (
    <Rhythm mx={1}>
      <IconButton color="primary">
        <ArrowUpDownIcon scale="medium" />
      </IconButton>
    </Rhythm>
  ),
  triangleSize: 0,
  withoutTogglerFocusStyle: true,
};

NoTriangle.decorators = [
  (Story, { args: { position, layout } }) => (
    <Typography<'div'>
      as="div"
      color="primary"
      style={{
        margin: 20,
        height: 60,
        position: 'relative',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          position: 'absolute',
          ...getHorizontalPosition(position, layout),
          ...getVerticalPosition(position, layout),
        }}
      >
        <span>Sometimes a tooltip should be clickable, or on an icon.</span>
        {Story()}
        <span>That is neat.</span>
      </div>
    </Typography>
  ),
];
