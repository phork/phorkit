import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Looper } from 'components/Looper';
import { Flex, FlexProps } from '../Flex';
import flexStory, { FlexBox, defaultArgs as initDefaultArgs } from './Flex.stories';

export default {
  ...flexStory,
  title: 'Utilities/Flex/Row',
  includeStories: undefined,
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args: FlexProps) => <Flex {...args} />;
const defaultArgs = { ...initDefaultArgs, direction: 'row' as FlexProps['direction'], style: { minWidth: 500 } };

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Flex.test.js'],
};
*/

export const Center = Template.bind({});
Center.storyName = 'alignItems: center, justifyContent: center';
Center.args = {
  ...defaultArgs,
  alignItems: 'center',
  justifyContent: 'center',
};

export const FlexStart = Template.bind({});
FlexStart.storyName = 'alignItems: flex-start, justifyContent: flex-start';
FlexStart.args = {
  ...defaultArgs,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

export const FlexEnd = Template.bind({});
FlexEnd.storyName = 'alignItems: flex-end, justifyContent: flex-end';
FlexEnd.args = {
  ...defaultArgs,
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
};

export const JustifyContentSpaceBetween = Template.bind({});
JustifyContentSpaceBetween.storyName = 'justifyContent: space-between';
JustifyContentSpaceBetween.args = {
  ...defaultArgs,
  justifyContent: 'space-between',
};

export const JustifyContentSpaceAround = Template.bind({});
JustifyContentSpaceAround.storyName = 'justifyContent: space-around';
JustifyContentSpaceAround.args = {
  ...defaultArgs,
  justifyContent: 'space-around',
};

export const JustifyContentSpaceEvenly = Template.bind({});
JustifyContentSpaceEvenly.storyName = 'justifyContent: space-evenly';
JustifyContentSpaceEvenly.args = {
  ...defaultArgs,
  justifyContent: 'space-evenly',
};

export const AlignContentCenter = Template.bind({});
AlignContentCenter.storyName = 'alignContent: center';
AlignContentCenter.args = {
  ...defaultArgs,
  alignContent: 'center',
  children: (
    <Looper
      end={30}
      render={i => (
        <FlexBox height={40} key={i} width={40}>
          {i}
        </FlexBox>
      )}
      start={0}
    />
  ),
  style: { ...defaultArgs.style, minHeight: 140 },
  wrap: true,
};

export const AlignContentSpaceBetween = Template.bind({});
AlignContentSpaceBetween.storyName = 'alignContent: space-between';
AlignContentSpaceBetween.args = {
  ...defaultArgs,
  alignContent: 'space-between',
  children: (
    <Looper
      end={30}
      render={i => (
        <FlexBox height={40} key={i} width={40}>
          {i}
        </FlexBox>
      )}
      start={0}
    />
  ),
  style: { ...defaultArgs.style, minHeight: 140 },
  wrap: true,
};
