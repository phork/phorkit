import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { TimesIcon } from 'icons/TimesIcon';
import { PageTitle } from 'stories/helpers/PageTitle';
import { ThemeWrapper } from '../../../stories/helpers/ThemeWrapper';
import { Rhythm } from '../Rhythm';

export default {
  title: 'Utilities/Rhythm',
  component: Rhythm,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    className: {
      control: {
        disable: true,
      },
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
  decorators: [
    Story => (
      <ThemeWrapper withThemeId>
        {({ themeId }) => (
          <div
            style={{
              background: themes[themeId]['color-accent-primary-L30'],
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Story()}
          </div>
        )}
      </ThemeWrapper>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Rhythm" title="Rhythm" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'To add margins and padding around an element or a group of elements.',
      },
    },
    layout: 'centered',
  },
} as ComponentMeta<typeof Rhythm>;

const ContentBox = ({ className }: { className?: string }) => (
  <ThemeWrapper withThemeId>
    {({ themeId }) => (
      <div className={className} style={{ background: themes[themeId]['color-accent-primary'] }}>
        <TimesIcon size={20} style={{ color: themes[themeId]['contrast-palette-text-color'], float: 'left' }} />
      </div>
    )}
  </ThemeWrapper>
);

const Template: ComponentStory<typeof Rhythm> = args => (
  <Rhythm {...args}>
    <ContentBox />
  </Rhythm>
);

const defaultArgs = {
  grouped: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Margin = Template.bind({});
Margin.storyName = 'All margins';
Margin.args = {
  ...defaultArgs,
  m: 3,
};

export const MarginY = Template.bind({});
MarginY.storyName = 'Top and bottom margins';
MarginY.args = {
  ...defaultArgs,
  my: 3,
};

export const MarginX = Template.bind({});
MarginX.storyName = 'Left and right margins';
MarginX.args = {
  ...defaultArgs,
  mx: 3,
};

export const MarginTop = Template.bind({});
MarginTop.storyName = 'Top margin';
MarginTop.args = {
  ...defaultArgs,
  mt: 3,
};

export const MarginBottom = Template.bind({});
MarginBottom.storyName = 'Bottom margin';
MarginBottom.args = {
  ...defaultArgs,
  mb: 3,
};

export const MarginLeft = Template.bind({});
MarginLeft.storyName = 'Left margin';
MarginLeft.args = {
  ...defaultArgs,
  ml: 3,
};

export const MarginRight = Template.bind({});
MarginRight.storyName = 'Right margin';
MarginRight.args = {
  ...defaultArgs,
  mr: 3,
};

export const Padding = Template.bind({});
Padding.storyName = 'All padding';
Padding.args = {
  ...defaultArgs,
  p: 3,
};

export const PaddingY = Template.bind({});
PaddingY.storyName = 'Top and bottom padding';
PaddingY.args = {
  ...defaultArgs,
  py: 3,
};

export const PaddingX = Template.bind({});
PaddingX.storyName = 'Left and right padding';
PaddingX.args = {
  ...defaultArgs,
  px: 3,
};

export const PaddingTop = Template.bind({});
PaddingTop.storyName = 'Top padding';
PaddingTop.args = {
  ...defaultArgs,
  pt: 3,
};

export const PaddingBottom = Template.bind({});
PaddingBottom.storyName = 'Bottom padding';
PaddingBottom.args = {
  ...defaultArgs,
  pb: 3,
};

export const PaddingLeft = Template.bind({});
PaddingLeft.storyName = 'Left padding';
PaddingLeft.args = {
  ...defaultArgs,
  pl: 3,
};

export const PaddingRight = Template.bind({});
PaddingRight.storyName = 'Right padding';
PaddingRight.args = {
  ...defaultArgs,
  pr: 3,
};
