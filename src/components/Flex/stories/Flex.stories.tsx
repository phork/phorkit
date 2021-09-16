import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { themes } from 'config/themes';
import { useThemeId } from 'context/Theme/useThemeId';
import { Looper } from 'docs/helpers/Looper';
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
      control: { type: 'inline-radio' },
      table: {
        category: 'Primary controls',
      },
    },
    alignContent: {
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    alignItems: {
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    alignSelf: {
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    justifyContent: {
      control: { type: 'radio' },
      table: {
        category: 'Primary controls',
      },
    },
    flexible: {
      table: {
        category: 'Primary controls',
      },
    },
    full: {
      table: {
        category: 'Primary controls',
      },
    },
    inflexible: {
      table: {
        category: 'Primary controls',
      },
    },
    inline: {
      table: {
        category: 'Primary controls',
      },
    },
    max: {
      table: {
        category: 'Primary controls',
      },
    },
    reverse: {
      table: {
        category: 'Primary controls',
      },
    },
    wrap: {
      table: {
        category: 'Primary controls',
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
      exclude: ['className'],
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
      description: {
        component: 'A component to add flexbox styling to a container div.',
      },
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
        backgroundColor: themes[themeId]['color-accent-primary'],
        border: `1px solid ${themes[themeId]['color-accent-primary-contrast']}`,
        color: themes[themeId]['color-accent-primary-contrast'],
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
};

export const Template: ComponentStory<typeof Flex> = (args: FlexProps) => <Flex {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
