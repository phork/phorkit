import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { StateWrapper } from 'docs/helpers/StateWrapper';
import { PageTitle } from 'stories/helpers/PageTitle';
import { FormboxContainer } from '../../../components/Form/Formbox/FormboxContainer';
import { TextboxGroup2FA, TextboxGroup2FAProps } from '../TextboxGroup2FA';

export default {
  title: 'Form/TextboxGroup/TextboxGroup2FA',
  component: TextboxGroup2FA,
  argTypes: {
    inputWidth: {
      table: {
        category: 'Appearance',
      },
    },
    length: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
      table: {
        category: 'Appearance',
      },
    },
    variant: {
      table: {
        category: 'Appearance',
      },
    },

    value: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Input',
      },
    },

    onChange: {
      control: {
        disable: true,
      },
      table: {
        category: 'Actions',
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
    inputClassName: {
      table: {
        category: 'Uncommon',
      },
    },
    inputStyle: {
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
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/TextboxGroup2FA" title="TextboxGroup2FA" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      source: {
        code: '<TextboxGroup2FA {...args} />',
      },
    },
  },
} as ComponentMeta<typeof TextboxGroup2FA>;

const Template: ComponentStory<typeof TextboxGroup2FA> = ({ onChange, value, ...args }) => (
  <StateWrapper initialState={value}>
    {({ state, setState }) => <TextboxGroup2FA onChange={(_event, value) => setState(value)} value={state} {...args} />}
  </StateWrapper>
);

const defaultArgs = {
  inputWidth: 64,
  length: 6,
  size: '7xlarge' as TextboxGroup2FAProps['size'],
  variant: 'outline' as TextboxGroup2FAProps['variant'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['TextboxGroup2FA.test.js'],
};
*/

export const UnderlineVariant = Template.bind({});
UnderlineVariant.storyName = 'Variant: Underline';
UnderlineVariant.args = {
  ...defaultArgs,
  variant: 'underline',
};

export const FilledVariant = Template.bind({});
FilledVariant.storyName = 'Variant: Filled';
FilledVariant.args = {
  ...defaultArgs,
  variant: 'filled',
};

export const OutlineVariant = Template.bind({});
OutlineVariant.storyName = 'Variant: Outline';
OutlineVariant.args = {
  ...defaultArgs,
  variant: 'outline',
};

export const Labeled = ({ onChange, size, value, ...args }: TextboxGroup2FAProps) => (
  <StateWrapper initialState={value}>
    {({ state, setState }) => (
      <FormboxContainer focused as="label" label="Two-factor code" size={size} type="input" variant="minimal">
        <TextboxGroup2FA onChange={(_event, value) => setState(value)} size={size} value={state} {...args} />
      </FormboxContainer>
    )}
  </StateWrapper>
);

Labeled.args = {
  ...defaultArgs,
};

Labeled.parameters = {
  docs: {
    source: {
      code: `
<FormboxContainer focused as="label" label="Two-factor code" size={size} type="input" variant="minimal">
  <TextboxGroup2FA {...args} />
</FormboxContainer>
      `,
    },
  },
};
