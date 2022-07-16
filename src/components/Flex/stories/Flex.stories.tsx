import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { useThemeId } from 'context/Theme/useThemeId';
import { Looper } from 'components/Looper';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Flex, FlexProps } from '../Flex';

export default {
  title: 'Utilities/Flex',
  component: Flex,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    direction: {
      options: ['row', 'column'],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Flexbox',
      },
    },
    alignContent: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Flexbox',
      },
    },
    alignItems: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Flexbox',
      },
    },
    alignSelf: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Flexbox',
      },
    },
    justifyContent: {
      control: {
        type: 'radio',
      },
      table: {
        category: 'Flexbox',
      },
    },
    flexible: {
      table: {
        category: 'Flexbox',
      },
    },
    inflexible: {
      table: {
        category: 'Flexbox',
      },
    },
    inline: {
      table: {
        category: 'Flexbox',
      },
    },
    reverse: {
      table: {
        category: 'Flexbox',
      },
    },
    wrap: {
      table: {
        category: 'Flexbox',
      },
    },

    full: {
      table: {
        category: 'Appearance',
      },
    },
    max: {
      table: {
        category: 'Appearance',
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
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/Flex" title="Flex" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
  includeStories: ['Default'],
} as ComponentMeta<typeof Flex>;

export function FlexBox({
  children,
  height,
  width,
  ...props
}: {
  children: React.ReactChild;
  height: number | string;
  width: number | string;
}) {
  const themeId = useThemeId();
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: `var(--phork-accent-color, ${themes[themeId]['color-accent']}`,
        border: `1px solid var(--phork-accent-color-contrast, ${themes[themeId]['color-accent-contrast']})`,
        color: `var(--phork-accent-color-contrast, ${themes[themeId]['color-accent-contrast']})`,
        display: 'flex',
        height,
        justifyContent: 'center',
        width,
        ...props,
      }}
    >
      {children}
    </div>
  );
}

export const defaultArgs = {
  children: (
    <Looper
      end={5}
      render={i => (
        <FlexBox height={40 + i * 10} key={i} width={40 + i * 10}>
          {i}
        </FlexBox>
      )}
      start={0}
    />
  ),
  direction: 'row' as FlexProps['direction'],
  flexible: false,
  full: false,
  inflexible: false,
  inline: false,
  max: false,
  reverse: false,
  wrap: false,
};

export const Template: ComponentStory<typeof Flex> = (args: FlexProps) => <Flex {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Flex.test.js'],
};
*/
