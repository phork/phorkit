import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ThemeColorIds } from '../../../config/themes';
import { getPrimaryColorIds } from '../../../stories/helpers/utils';
import { ColoredDivider, ColoredDividerProps } from '../ColoredDivider';
import dividerStory from './Divider.stories';

export default {
  ...dividerStory,
  title: 'Utilities/Divider/ColoredDivider',
  component: ColoredDivider,
  argTypes: {
    colorId: {
      options: getPrimaryColorIds('light'),
      control: { type: 'select' },
      table: {
        category: 'Color controls',
      },
    },
    ...dividerStory.argTypes,
  },
} as ComponentMeta<typeof ColoredDivider>;

const Template: ComponentStory<typeof ColoredDivider> = args => <ColoredDivider {...args} />;

const defaultArgs = {
  colorId: 'P60' as ThemeColorIds,
  orientation: 'horizontal' as ColoredDividerProps['orientation'],
  variant: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = {
  contrast: { table: { disable: true } },
  style: { table: { disable: true } },
  unthemed: { table: { disable: true } },
  variant: { table: { disable: true } },
};
