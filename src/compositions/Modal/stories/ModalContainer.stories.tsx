import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Flex } from 'components/Flex/Flex';
import { Typography } from 'components/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalContainer } from '../ModalContainer';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

export default {
  title: 'Surfaces/Modals/ModalContainer',
  component: ModalContainer,
  argTypes: {
    children: {
      control: { disable: true },
    },

    onEscape: {
      table: {
        category: 'Actions',
      },
    },

    className: {
      control: { disable: true },
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
      <Flex full alignItems="center" justifyContent="center">
        <Typography color="primary" size="large" variants="italic" volume="quietest">
          See the center of the page
        </Typography>
        <Story />
      </Flex>
    ),
  ],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: () => (
        <React.Fragment>
          <PageTitle src="compositions/Modal" title="ModalContainer" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof ModalContainer>;

const Template: ComponentStory<typeof ModalContainer> = args => <ModalContainer {...args} />;

const defaultArgs = {
  children: (
    <Modal immediate size="medium">
      {({ id }) => (
        <React.Fragment>
          <ModalHeader modalId={id} title="Hello world" />
          <ModalBody scrollable>
            <Typography variants={['line-height-comfy']}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla neque, tempus vitae mollis non,
                suscipit eget urna. Phasellus viverra sodales nibh, et tristique dui lacinia ac. In a erat elit. Morbi
                consequat quam non consequat ullamcorper. Suspendisse vel elementum lacus, id bibendum libero. Etiam sed
                mauris bibendum, tincidunt neque quis, fringilla lectus. Curabitur finibus enim a dolor suscipit, quis
                tristique ante facilisis. Sed arcu eros, sodales vel lectus aliquet, mollis porttitor dolor. Proin
                pharetra, ante eget malesuada consequat, sapien neque mattis elit, id mollis arcu enim id leo. Vivamus
                posuere porta dapibus. Aenean ultrices mollis eros id feugiat.
              </p>
              <p>
                Duis non magna et erat vestibulum posuere. In eu libero ultrices, dictum massa non, congue odio. Ut
                finibus facilisis lacinia. Nunc imperdiet pellentesque varius. Suspendisse interdum semper eros, id
                condimentum turpis dignissim vel. Cras mattis diam id lacinia mollis. Maecenas id placerat augue.
                Phasellus mattis diam in tellus rhoncus, ac suscipit turpis lobortis. Etiam et lobortis diam. Fusce odio
                risus, laoreet in feugiat vel, consequat nec purus. Donec vel commodo erat. Proin sit amet diam blandit,
                cursus velit in, commodo libero. Maecenas faucibus est eget lectus imperdiet fermentum. Proin in est
                aliquam, elementum dolor non, blandit leo. Cras eleifend placerat orci in maximus. Suspendisse tempus
                diam ligula, ac congue dolor lacinia a.
              </p>
            </Typography>
          </ModalBody>
          <ModalFooter>
            <Typography align="right" as="div" size="xsmall" variants={['italic']} volume="quiet">
              To be continued ...
            </Typography>
          </ModalFooter>
        </React.Fragment>
      )}
    </Modal>
  ),
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['ModalContainer.test.js'],
};
*/
