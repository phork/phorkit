import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { CheckIcon } from 'icons/internal/CheckIcon';
import { Rhythm } from 'components/Rhythm/Rhythm';
import { PageTitle } from 'stories/helpers/PageTitle';
import { StyledChip, StyledChipProps } from '../StyledChip';
import chipStory from './Chip.stories';

const argTypes = { ...chipStory.argTypes };
delete argTypes.contrast;
delete argTypes.themeId;

export default {
  ...chipStory,
  title: 'Display/Chip/StyledChip',
  component: StyledChip,
  argTypes: {
    avatarBackgroundColor: {
      table: {
        category: 'Styled',
      },
    },
    avatarTextColor: {
      table: {
        category: 'Styled',
      },
    },
    tagActivePrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    tagHoveredPrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    tagInverseColor: {
      table: {
        category: 'Styled',
      },
    },
    tagPrimaryColor: {
      table: {
        category: 'Styled',
      },
    },
    ...argTypes,
  },
  parameters: {
    ...chipStory.parameters,
    docs: {
      ...chipStory.parameters?.docs,
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Chip" title="StyledChip" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof StyledChip>;

const Template: ComponentStory<typeof StyledChip> = args => <StyledChip {...args} />;

const defaultArgs = {
  avatarBackgroundColor: '#f41150',
  avatarTextColor: '#fff',
  actionable: true,
  avatar: { initials: 'P' },
  icon: (
    <Rhythm mr={2}>
      <CheckIcon scale="medium" />
    </Rhythm>
  ),
  shape: 'pill' as StyledChipProps['shape'],
  size: 'medium' as StyledChipProps['size'],
  tagActivePrimaryColor: '#da0a44',
  tagHoveredPrimaryColor: '#d64072',
  tagInverseColor: '#fff',
  tagPrimaryColor: '#f41150',
  text: 'Hello world',
  weight: 'shaded' as StyledChipProps['weight'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['StyledChip.test.js', 'Chip.test.js'],
};
*/

Default.argTypes = {
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
};
