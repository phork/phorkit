import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';
import React from 'react';
import { Button } from 'components/Button';
import { Flex } from 'components/Flex';
import { Looper } from 'components/Looper';
import { Rhythm } from 'components/Rhythm/Rhythm';
import { Typography } from 'components/Typography';
import { StateWrapper } from 'docs/helpers/StateWrapper';
import { LineLoader } from '../LineLoader';
import LineLoaderDocumentation from './LineLoader.docs.mdx';

export default {
  title: 'Feedback/LineLoader',
  component: LineLoader,
  argTypes: {
    fixed: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Appearance',
      },
    },
    position: {
      options: ['top', 'bottom', undefined],
      control: {
        type: 'radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    duration: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Animation',
      },
    },
    loops: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Animation',
      },
    },
    percent: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Animation',
      },
    },
    onFinish: {
      control: {
        disable: true,
      },
      table: {
        category: 'Actions',
      },
    },
    onLoop: {
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
  decorators: [Story => <div style={{ position: 'relative', minHeight: 40 }}>{Story()}</div>],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: LineLoaderDocumentation,
    },
  },
} as ComponentMeta<typeof LineLoader>;

const Template: ComponentStory<typeof LineLoader> = ({ children, ...args }) => <LineLoader {...args} />;

const defaultArgs = {
  contrast: false,
  fixed: false,
  onLoop: undefined,
  percent: isChromatic() ? 24 : undefined,
  unthemed: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['LineLoader.test.js'],
};
*/

export const PositionTop = Template.bind({});
PositionTop.storyName = 'Position: Top';
PositionTop.args = {
  ...defaultArgs,
  position: 'top',
};

export const PositionBottom = Template.bind({});
PositionBottom.storyName = 'Position: Bottom';
PositionBottom.args = {
  ...defaultArgs,
  position: 'bottom',
};

export const Fixed = Template.bind({});
Fixed.storyName = 'Fixed position';
Fixed.args = {
  ...defaultArgs,
  fixed: true,
  position: 'top',
};

Fixed.decorators = [
  Story => (
    <Flex full alignItems="center" justifyContent="center">
      <Typography color="primary" size="large" variants="italic" volume="quietest">
        See the top of the page
      </Typography>
      <Story />
    </Flex>
  ),
];

export const FiniteLoops = Template.bind({});
FiniteLoops.storyName = 'Finite loops';
FiniteLoops.args = {
  ...defaultArgs,
};

FiniteLoops.decorators = [
  (_Story, { args }) => (
    <StateWrapper initialState={3}>
      {({ state: loops, setState: setLoops }) => (
        <React.Fragment>
          <Rhythm grouped pt={4}>
            <Looper
              end={5}
              render={i => (
                <Rhythm key={i} m={1}>
                  <Button
                    color="primary"
                    onClick={() => setLoops(i)}
                    shape="brick"
                    weight={i === loops ? 'solid' : 'shaded'}
                  >{`${i} loops`}</Button>
                </Rhythm>
              )}
              start={1}
              step={1}
            />
          </Rhythm>
          <LineLoader {...args} key={loops} loops={loops} onFinish={action('finished')} position="top" />
        </React.Fragment>
      )}
    </StateWrapper>
  ),
];

FiniteLoops.parameters = {
  docs: {
    source: {
      code: '<LineLoader loops={loops} />',
    },
  },
};

export const Stoppable = Template.bind({});
Stoppable.storyName = 'Stoppable';
Stoppable.args = {
  ...defaultArgs,
};

Stoppable.decorators = [
  (_Story, { args }) => (
    <StateWrapper<number | undefined> initialState={0}>
      {({ state: percent, setState: setPercent }) => (
        <React.Fragment>
          <Rhythm grouped pt={4}>
            <Button color="primary" onClick={() => setPercent(percent ? undefined : 50)} shape="brick" weight="shaded">
              {percent ? 'Restart' : 'Stop'}
            </Button>
          </Rhythm>
          <LineLoader {...args} percent={percent} position="top" />
        </React.Fragment>
      )}
    </StateWrapper>
  ),
];

Stoppable.parameters = {
  chromatic: { disableSnapshot: true },
  docs: {
    source: {
      code: '<LineLoader percent={stopped ? 50 : undefined} />',
    },
  },
};
