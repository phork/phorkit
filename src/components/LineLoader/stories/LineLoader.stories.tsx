import { action } from '@storybook/addon-actions';
import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Rhythm } from 'src/components/Rhythm/Rhythm';
import { Button } from 'components/Button';
import { Looper } from 'docs/helpers/Looper';
import { StateWrapper } from 'docs/helpers/StateWrapper';
import { PageTitle } from 'stories/helpers/PageTitle';
import { LineLoader } from '../LineLoader';

export default {
  title: 'Feedback/LineLoader',
  component: LineLoader,
  argTypes: {
    position: {
      control: 'radio',
      options: [undefined, 'top', 'bottom'],
    },

    onFinish: {
      control: {
        disable: true,
      },
      table: {
        category: 'Action controls',
      },
    },
    onLoop: {
      control: {
        disable: true,
      },
      table: {
        category: 'Action controls',
      },
    },

    contrast: {
      table: {
        category: 'Uncommon controls',
      },
    },
    unthemed: {
      table: {
        category: 'Uncommon controls',
      },
    },
  },
  decorators: [Story => <div style={{ position: 'relative', minHeight: 40 }}>{Story()}</div>],
  parameters: {
    controls: {
      exclude: ['className', 'themeId', 'translations'],
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="components/LineLoader" title="LineLoader" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
      description: {
        component: 'The line loader shows an animated bar at the top or bottom of the page to show loading state.',
      },
    },
  },
} as ComponentMeta<typeof LineLoader>;

const Template: ComponentStory<typeof LineLoader> = ({ children, ...args }) => <LineLoader {...args} />;

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

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

export const FiniteLoops = Template.bind({});
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

FiniteLoops.storyName = 'Finite loops';
FiniteLoops.args = {
  ...defaultArgs,
};

export const Stoppable = Template.bind({});
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

Stoppable.storyName = 'Stoppable';
Stoppable.args = {
  ...defaultArgs,
};
