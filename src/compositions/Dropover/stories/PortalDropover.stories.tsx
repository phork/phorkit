import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Button } from 'components/Button/Button';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { DropoverContent } from '../DropoverContent';
import { DropoverLabel } from '../DropoverLabel';
import { PortalDropover, PortalDropoverProps, defaultPortalOffset } from '../PortalDropover';

export default {
  title: 'Surfaces/Dropover/PortalDropover',
  component: PortalDropover,
  argTypes: {
    align: {
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
    label: {
      control: {
        disable: true,
      },
      table: {
        category: 'Appearance',
      },
    },
    offset: {
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
    focusRef: {
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
    passiveLabel: {
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
    withoutTogglerFocusStyle: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    (Story, { args: { align } }) => (
      <div style={{ margin: 20, [align === 'right' ? 'marginLeft' : 'marginRight']: 160, minHeight: 120 }}>
        {Story()}
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
          <PageTitle src="compositions/Dropover" title="PortalDropover" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof PortalDropover>;

const Template: ComponentStory<(args: PortalDropoverProps<HTMLButtonElement>) => ReturnType<typeof PortalDropover>> =
  args => <PortalDropover<HTMLDivElement, HTMLButtonElement> {...args} />;

const defaultArgs = {
  align: 'left' as PortalDropoverProps<HTMLButtonElement>['align'],
  alwaysRender: false,
  children: (
    <DropoverContent>
      <Typography color="secondary" size="medium" variants="line-height-comfy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eros neque, ullamcorper at erat quis, eleifend
        gravida dolor.
      </Typography>
    </DropoverContent>
  ),
  focusable: false,
  hoverable: false,
  ignoreClickOutside: false,
  initialVisible: false,
  isTooltip: false,
  label: (
    <DropoverLabel>
      <Typography color="primary" size="large" variants="line-height-normal" weight="bold">
        Hello world
      </Typography>
    </DropoverLabel>
  ),
  observe: false,
  offset: defaultPortalOffset,
  passiveLabel: false,
  permanent: false,
  width: 240,
  withoutTogglerFocusStyle: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['PortalDropover.test.js'],
};
*/

export const LeftAlign = Template.bind({});
LeftAlign.storyName = 'Align: Left';
LeftAlign.args = {
  ...defaultArgs,
  align: 'left',
};

export const RightAlign = Template.bind({});
RightAlign.storyName = 'Align: Right';
RightAlign.args = {
  ...defaultArgs,
  align: 'right',
};

export const NoTriangle = Template.bind({});
NoTriangle.storyName = 'No triangle';
NoTriangle.args = {
  ...defaultArgs,
  label: (
    <DropoverLabel noTriangle>
      <Typography color="primary" size="large" variants="line-height-normal" weight="bold">
        Hello world
      </Typography>
    </DropoverLabel>
  ),
};

export const CloseButton = Template.bind({});
CloseButton.storyName = 'With close button';
CloseButton.args = {
  ...defaultArgs,
  children: undefined,
  focusable: true,
  renderChildren: ({ close, focusRef }) => (
    <DropoverContent>
      <Typography size="medium" variants="line-height-comfy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eros neque, ullamcorper at erat quis, eleifend
        gravida
        <Typography variants="space-before">
          <Button color="primary" onClick={() => close()} ref={focusRef} weight="inline">
            close
          </Button>
        </Typography>
        .
      </Typography>
    </DropoverContent>
  ),
};
