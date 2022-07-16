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

    m: {
      control: {
        type: 'number',
        min: -4,
        max: 16,
      },
      table: {
        category: 'Margin',
      },
    },
    mb: {
      control: {
        type: 'number',
        min: -4,
        max: 16,
      },
      table: {
        category: 'Margin',
      },
    },
    ml: {
      control: {
        type: 'number',
        min: -4,
        max: 16,
      },
      table: {
        category: 'Margin',
      },
    },
    mr: {
      control: {
        type: 'number',
        min: -4,
        max: 16,
      },
      table: {
        category: 'Margin',
      },
    },
    mt: {
      control: {
        type: 'number',
        min: -4,
        max: 16,
      },
      table: {
        category: 'Margin',
      },
    },
    mx: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Margin',
      },
    },
    my: {
      control: {
        type: 'number',
        min: -4,
        max: 16,
      },
      table: {
        category: 'Margin',
      },
    },
    p: {
      control: {
        type: 'number',
        min: 0,
        max: 16,
      },
      table: {
        category: 'Padding',
      },
    },
    pb: {
      control: {
        type: 'number',
        min: 0,
        max: 16,
      },
      table: {
        category: 'Padding',
      },
    },
    pl: {
      control: {
        type: 'number',
        min: 0,
        max: 16,
      },
      table: {
        category: 'Padding',
      },
    },
    pr: {
      control: {
        type: 'number',
        min: 0,
        max: 16,
      },
      table: {
        category: 'Padding',
      },
    },
    pt: {
      control: {
        type: 'number',
        min: 0,
        max: 16,
      },
      table: {
        category: 'Padding',
      },
    },
    px: {
      control: {
        type: 'number',
        min: 0,
        max: 16,
      },
      table: {
        category: 'Padding',
      },
    },
    py: {
      control: {
        type: 'number',
        min: 0,
        max: 16,
      },
      table: {
        category: 'Padding',
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
    style: {
      table: {
        category: 'Uncommon',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeWrapper>
        {({ themeId }) => (
          <div
            style={{
              background: `var(--phork-accent-color-L30, ${themes[themeId]['color-accent-L30']})`,
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
    },
  },
} as ComponentMeta<typeof Rhythm>;

const ContentBox = ({ className }: { className?: string }) => (
  <ThemeWrapper>
    {({ themeId }) => (
      <div
        className={className}
        style={{ background: `var(--phork-accent-color, ${themes[themeId]['color-accent']})` }}
      >
        <TimesIcon
          size={20}
          style={{
            color: `var(--phork-accent-color-contrast, ${themes[themeId]['color-accent-contrast']})`,
            float: 'left',
          }}
        />
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

/*
Default.parameters = {
  jest: ['Rhythm.test.js'],
};
*/

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
