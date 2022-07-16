import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StoryComponentDemo } from 'stories/helpers/StoryComponentDemo';
import { Pagination, PaginationProps, defaultPageLabelProps } from '../Pagination';
import PaginationDocumentation from './Pagination.docs.mdx';

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {
    color: {
      table: {
        category: 'Appearance',
      },
    },
    justify: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    shape: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },
    spacing: {
      options: ['divided', 'joined', 'cozy', 'comfy', null],
      table: {
        category: 'Appearance',
      },
    },
    weight: {
      table: {
        category: 'Appearance',
      },
    },
    withEllipsis: {
      table: {
        category: 'Appearance',
      },
    },
    withFirstAndLast: {
      table: {
        category: 'Appearance',
      },
    },
    withIcons: {
      table: {
        category: 'Appearance',
      },
    },
    withPageAndTotalLabel: {
      table: {
        category: 'Appearance',
      },
    },
    withPageLabel: {
      table: {
        category: 'Appearance',
      },
    },
    withPageLinks: {
      table: {
        category: 'Appearance',
      },
    },
    withPreviousAndNext: {
      table: {
        category: 'Appearance',
      },
    },

    page: {
      table: {
        category: 'Pages',
      },
    },
    pageLinks: {
      table: {
        category: 'Pages',
      },
    },
    pageSize: {
      table: {
        category: 'Pages',
      },
    },
    totalItems: {
      table: {
        category: 'Pages',
      },
    },

    allowRightClickLinks: {
      table: {
        category: 'Actions',
      },
    },
    getHref: {
      table: {
        category: 'Actions',
      },
    },
    onChangePage: {
      table: {
        category: 'Actions',
      },
    },

    activePageProps: {
      table: {
        category: 'Uncommon',
      },
    },
    buttonGroupClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    buttonGroupStyle: {
      table: {
        category: 'Uncommon',
      },
    },
    className: {
      table: {
        category: 'Uncommon',
      },
    },
    contrast: {
      table: {
        category: 'Uncommon',
      },
    },
    ellipsisProps: {
      table: {
        category: 'Uncommon',
      },
    },
    id: {
      table: {
        category: 'Uncommon',
      },
    },
    jumpProps: {
      table: {
        category: 'Uncommon',
      },
    },
    pageLabelProps: {
      table: {
        category: 'Uncommon',
      },
    },
    pageProps: {
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
  },
  decorators: [
    (Story, { initialArgs: { page } }) => (
      <StoryComponentDemo<number, NonNullable<PaginationProps['onChangePage']>>
        eventHandlerName="onChangePage"
        initialValue={page}
        valuePropName="page"
      >
        {Story()}
      </StoryComponentDemo>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: PaginationDocumentation,
    },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = args => <Pagination {...args} />;

const defaultArgs = {
  allowRightClickLinks: false,
  color: 'primary' as PaginationProps['color'],
  contrast: false,
  justify: 'start' as PaginationProps['justify'],
  pageLabelProps: defaultPageLabelProps,
  page: 8,
  pageLinks: 6,
  pageSize: 10,
  shape: 'brick' as PaginationProps['shape'],
  size: 'medium' as PaginationProps['size'],
  spacing: 'joined' as PaginationProps['spacing'],
  totalItems: 300,
  weight: 'shaded' as PaginationProps['weight'],
  withEllipsis: false,
  withFirstAndLast: false,
  withIcons: true,
  withPageAndTotalLabel: false,
  withPageLabel: false,
  withPageLinks: true,
  withPreviousAndNext: true,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Pagination.test.js'],
};
*/

export const AsButtons = Template.bind({});
AsButtons.storyName = 'As buttons';
AsButtons.args = {
  ...defaultArgs,
  onChangePage: action('change page'),
};

export const AsLinks = Template.bind({});
AsLinks.storyName = 'As links';
AsLinks.args = {
  ...defaultArgs,
  getHref: page => `#page${page}`,
};

AsLinks.parameters = {
  docs: {
    description: {
      story: 'Note that the links will cause the page to reload so the state will appear unchanged.',
    },
  },
};

export const RightClickLinks = Template.bind({});
RightClickLinks.storyName = 'Right click links';
RightClickLinks.args = {
  ...defaultArgs,
  getHref: page => `#page${page}`,
  onChangePage: action('change page'),
};

export const BrickShape = Template.bind({});
BrickShape.storyName = 'Shape: Brick';
BrickShape.args = {
  ...defaultArgs,
  shape: 'brick',
};

export const PillShape = Template.bind({});
PillShape.storyName = 'Shape: Pill';
PillShape.args = {
  ...defaultArgs,
  shape: 'pill',
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
  spacing: 'cozy',
};

export const MinimalWithIcons = Template.bind({});
MinimalWithIcons.storyName = 'Minimal with icons';
MinimalWithIcons.args = {
  ...defaultArgs,
  justify: 'end',
  withEllipsis: false,
  withFirstAndLast: false,
  withIcons: true,
  withPageAndTotalLabel: false,
  withPageLabel: false,
  withPageLinks: false,
  withPreviousAndNext: true,
};

export const MinimalWithText = Template.bind({});
MinimalWithText.storyName = 'Minimal with text';
MinimalWithText.args = {
  ...defaultArgs,
  justify: 'end',
  withEllipsis: false,
  withFirstAndLast: false,
  withIcons: false,
  withPageAndTotalLabel: false,
  withPageLabel: false,
  withPageLinks: false,
  withPreviousAndNext: true,
};

export const MinimalWithCustomText = Template.bind({});
MinimalWithCustomText.storyName = 'Minimal with custom text';
MinimalWithCustomText.args = {
  ...defaultArgs,
  justify: 'center',
  page: 1,
  translations: {
    previousPageLabel: 'Newer',
    nextPageLabel: 'Older',
  },
  withEllipsis: false,
  withFirstAndLast: false,
  withIcons: false,
  withPageAndTotalLabel: false,
  withPageLabel: false,
  withPageLinks: false,
  withPreviousAndNext: true,
};

export const CurrentPage = Template.bind({});
CurrentPage.storyName = 'Current page';
CurrentPage.args = {
  ...defaultArgs,
  justify: 'center',
  withEllipsis: false,
  withFirstAndLast: false,
  withIcons: false,
  withPageLabel: false,
  withPageAndTotalLabel: true,
  withPageLinks: false,
  withPreviousAndNext: false,
};

export const SolidWeight = Template.bind({});
SolidWeight.storyName = 'Weight: Solid';
SolidWeight.args = {
  ...defaultArgs,
  activePageProps: {
    style: { opacity: 0.8 },
  },
  weight: 'solid',
  spacing: 'divided',
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
  activePageProps: {
    weight: 'shaded',
    color: 'primary',
  },
  weight: 'outlined',
  withIcons: true,
  withPageLinks: true,
  withPreviousAndNext: true,
};

export const GhostWeight = Template.bind({});
GhostWeight.storyName = 'Weight: Ghost';
GhostWeight.args = {
  ...defaultArgs,
  activePageProps: {
    weight: 'shaded',
    color: 'primary',
    style: { marginLeft: 4, marginRight: 4 },
  },
  spacing: null,
  weight: 'ghost',
  withIcons: true,
  withPageLinks: true,
  withPreviousAndNext: true,
};

export const Unstyled = Template.bind({});
Unstyled.args = {
  ...defaultArgs,
  color: undefined,
  withIcons: true,
  withPageLinks: true,
  withPreviousAndNext: true,
};

export const EverythingIcons = Template.bind({});
EverythingIcons.storyName = 'Everything with icons';
EverythingIcons.args = {
  ...defaultArgs,
  ellipsisProps: { weight: 'ghost', color: 'neutral', style: { marginLeft: 8, marginRight: 8 } },
  jumpProps: { weight: 'shaded' },
  pageLabelProps: { size: 'medium', style: { marginRight: 30 }, variants: ['no-wrap'] },
  pageProps: { weight: 'shaded' },
  withEllipsis: true,
  withFirstAndLast: true,
  withIcons: true,
  withPageLabel: true,
  withPageLinks: true,
  withPreviousAndNext: true,
};

export const EverythingText = Template.bind({});
EverythingText.storyName = 'Everything with text';
EverythingText.args = {
  ...defaultArgs,
  ellipsisProps: { weight: 'ghost', color: 'neutral', style: { marginLeft: 8, marginRight: 8 } },
  jumpProps: { weight: 'shaded' },
  pageLabelProps: { size: 'medium', style: { marginRight: 30 }, variants: ['no-wrap'] },
  pageProps: { weight: 'shaded' },
  withEllipsis: true,
  withFirstAndLast: true,
  withIcons: false,
  withPageLabel: true,
  withPageLinks: true,
  withPreviousAndNext: true,
};

export const NeutralColor = Template.bind({});
NeutralColor.storyName = 'Color: Neutral';
NeutralColor.args = {
  ...defaultArgs,
  color: 'neutral',
  ellipsisProps: { weight: 'ghost', color: 'neutral', style: { marginLeft: 8, marginRight: 8 } },
  jumpProps: { weight: 'shaded' },
  pageLabelProps: { size: 'medium', style: { marginRight: 30 }, variants: ['no-wrap'] },
  pageProps: { weight: 'shaded' },
  withEllipsis: true,
  withFirstAndLast: true,
  withIcons: false,
  withPageLabel: true,
  withPageLinks: true,
  withPreviousAndNext: true,
};
