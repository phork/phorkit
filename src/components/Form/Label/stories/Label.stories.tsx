import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Label, LabelProps } from '../Label';
import LabelDocumentation from './Label.docs.mdx';

export default {
  title: 'Form/Label',
  component: Label,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },

    disabled: {
      table: {
        category: 'Appearance',
      },
    },
    focused: {
      table: {
        category: 'Appearance',
      },
    },
    muted: {
      table: {
        category: 'Appearance',
      },
    },
    noWrap: {
      table: {
        category: 'Appearance',
      },
    },
    strength: {
      table: {
        category: 'Appearance',
      },
    },
    validity: {
      options: ['success', 'warning', 'danger', undefined],
      table: {
        category: 'Appearance',
      },
    },

    as: {
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
    unthemed: {
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
      page: LabelDocumentation,
    },
  },
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = args => <Label {...args} />;

const defaultArgs = {
  children: 'Super fantastic label',
  contrast: false,
  disabled: false,
  focused: false,
  muted: false,
  noWrap: false,
  strength: 'standard' as LabelProps['strength'],
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Label.test.js'],
};
*/

export const StandardStrength = Template.bind({});
StandardStrength.storyName = 'Strength: Standard';
StandardStrength.args = {
  ...defaultArgs,
  strength: 'standard',
};

export const TransitionedStrength = Template.bind({});
TransitionedStrength.storyName = 'Strength: Transitioned';
TransitionedStrength.args = {
  ...defaultArgs,
  strength: 'transitioned',
};

export const LegendStrength = Template.bind({});
LegendStrength.storyName = 'Strength: Legend';
LegendStrength.args = {
  ...defaultArgs,
  strength: 'legend',
};

export const SuccessValidity = Template.bind({});
SuccessValidity.storyName = 'Validity: Success';
SuccessValidity.args = {
  ...defaultArgs,
  validity: 'success',
};

export const WarningValidity = Template.bind({});
WarningValidity.storyName = 'Validity: Warning';
WarningValidity.args = {
  ...defaultArgs,
  validity: 'warning',
};

export const DangerValidity = Template.bind({});
DangerValidity.storyName = 'Validity: Danger';
DangerValidity.args = {
  ...defaultArgs,
  validity: 'danger',
};

export const Muted = Template.bind({});
Muted.storyName = 'Muted';
Muted.args = {
  ...defaultArgs,
  muted: true,
};

export const Disabled = Template.bind({});
Disabled.storyName = 'Disabled';
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};
