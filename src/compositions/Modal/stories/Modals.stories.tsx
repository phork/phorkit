import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { HeartIcon } from 'icons/internal/HeartIcon';
import { Button } from 'components/Button';
import { ButtonGroup } from 'components/Button/ButtonGroup';
import { Flex } from 'components/Flex';
import { IconText } from 'components/IconText/IconText';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalConsumer } from '../ModalConsumer';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';
import { Modals } from '../Modals';
import ModalsDocumentation from './Modals.docs.mdx';

export default {
  title: 'Surfaces/Modals',
  component: Modals,
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
      page: ModalsDocumentation,
    },
  },
} as ComponentMeta<typeof Modals>;

const Template: ComponentStory<typeof Modals> = args => (
  <Modals {...args}>
    <ModalConsumer>
      {({ createModal, clearModals, popModal, hasModal, jumpModal }) => (
        <Rhythm m={2}>
          <Button
            color="primary"
            onClick={() =>
              createModal(
                <Modal<HTMLButtonElement>
                  focusable
                  contextId="demo-large-modal"
                  onClose={(_event, contextId) => console.log(`closed ${contextId}`)}
                  size="large"
                  style={{ height: '400px' }}
                >
                  {({ id, focusRef }) => (
                    <React.Fragment>
                      <ModalHeader modalId={id} title="A large modal" />
                      <ModalBody scrollable>
                        <Typography variants={['line-height-comfy']}>
                          <p>
                            This is a large modal with scrollable content. This uses a render function to focus the
                            submit button.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla neque, tempus vitae
                            mollis non, suscipit eget urna. Phasellus viverra sodales nibh, et tristique dui lacinia ac.
                            In a erat elit. Morbi consequat quam non consequat ullamcorper. Suspendisse vel elementum
                            lacus, id bibendum libero. Etiam sed mauris bibendum, tincidunt neque quis, fringilla
                            lectus. Curabitur finibus enim a dolor suscipit, quis tristique ante facilisis. Sed arcu
                            eros, sodales vel lectus aliquet, mollis porttitor dolor. Proin pharetra, ante eget
                            malesuada consequat, sapien neque mattis elit, id mollis arcu enim id leo. Vivamus posuere
                            porta dapibus. Aenean ultrices mollis eros id feugiat.
                          </p>
                          <p>
                            Duis non magna et erat vestibulum posuere. In eu libero ultrices, dictum massa non, congue
                            odio. Ut finibus facilisis lacinia. Nunc imperdiet pellentesque varius. Suspendisse interdum
                            semper eros, id condimentum turpis dignissim vel. Cras mattis diam id lacinia mollis.
                            Maecenas id placerat augue. Phasellus mattis diam in tellus rhoncus, ac suscipit turpis
                            lobortis. Etiam et lobortis diam. Fusce odio risus, laoreet in feugiat vel, consequat nec
                            purus. Donec vel commodo erat. Proin sit amet diam blandit, cursus velit in, commodo libero.
                            Maecenas faucibus est eget lectus imperdiet fermentum. Proin in est aliquam, elementum dolor
                            non, blandit leo. Cras eleifend placerat orci in maximus. Suspendisse tempus diam ligula, ac
                            congue dolor lacinia a.
                          </p>
                          <p>
                            Praesent porttitor tortor quis enim aliquam pellentesque. Sed et erat nunc. Sed ac placerat
                            diam. Etiam interdum ex nec velit faucibus, sit amet suscipit metus efficitur. Aliquam nisi
                            est, iaculis sed cursus vitae, ornare dapibus purus. Integer quis dolor at felis
                            sollicitudin egestas vel in metus. Integer sed ante tristique, laoreet arcu id, bibendum
                            nulla. Pellentesque mattis, mi a mollis accumsan, purus nisl hendrerit dolor, in pharetra
                            nibh lorem a sem. Praesent nisi turpis, condimentum mattis nulla ut, pellentesque fringilla
                            arcu. Praesent scelerisque, nisl quis pulvinar mattis, augue augue vulputate mi, non mattis
                            diam lacus id ipsum. Sed sollicitudin metus et felis vehicula, ac lobortis tortor
                            scelerisque. In luctus ex consequat tellus sollicitudin convallis.
                          </p>
                        </Typography>
                      </ModalBody>
                      <ModalFooter bordered>
                        <Flex justifyContent="flex-end">
                          <Button
                            color="primary"
                            onClick={() =>
                              createModal(
                                <Modal<HTMLButtonElement>
                                  focusable
                                  contextId="demo-medium-modal"
                                  onClose={(_event, contextId) => console.log(`closed ${contextId}`)}
                                  size="medium"
                                >
                                  {({ id, focusRef }) => (
                                    <React.Fragment>
                                      <ModalHeader modalId={id} title="A medium modal" />
                                      <ModalBody>
                                        <Typography variants={['line-height-comfy']}>
                                          <p>
                                            This is a medium modal with inline content. This also uses a render
                                            function.
                                          </p>
                                          <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla
                                            neque, tempus vitae mollis non, suscipit eget urna. Phasellus viverra
                                            sodales nibh, et tristique dui lacinia ac. In a erat elit. Morbi consequat
                                            quam non consequat ullamcorper. Suspendisse vel elementum lacus, id bibendum
                                            libero. Etiam sed mauris bibendum, tincidunt neque quis, fringilla lectus.
                                            Curabitur finibus enim a dolor suscipit, quis tristique ante facilisis. Sed
                                            arcu eros, sodales vel lectus aliquet, mollis porttitor dolor. Proin
                                            pharetra, ante eget malesuada consequat, sapien neque mattis elit, id mollis
                                            arcu enim id leo. Vivamus posuere porta dapibus. Aenean ultrices mollis eros
                                            id feugiat.
                                          </p>
                                          <p>
                                            Duis non magna et erat vestibulum posuere. In eu libero ultrices, dictum
                                            massa non, congue odio. Ut finibus facilisis lacinia. Nunc imperdiet
                                            pellentesque varius. Suspendisse interdum semper eros, id condimentum turpis
                                            dignissim vel. Cras mattis diam id lacinia mollis. Maecenas id placerat
                                            augue. Phasellus mattis diam in tellus rhoncus, ac suscipit turpis lobortis.
                                            Etiam et lobortis diam. Fusce odio risus, laoreet in feugiat vel, consequat
                                            nec purus. Donec vel commodo erat. Proin sit amet diam blandit, cursus velit
                                            in, commodo libero. Maecenas faucibus est eget lectus imperdiet fermentum.
                                            Proin in est aliquam, elementum dolor non, blandit leo. Cras eleifend
                                            placerat orci in maximus. Suspendisse tempus diam ligula, ac congue dolor
                                            lacinia a.
                                          </p>
                                          <p>
                                            Praesent porttitor tortor quis enim aliquam pellentesque. Sed et erat nunc.
                                            Sed ac placerat diam. Etiam interdum ex nec velit faucibus, sit amet
                                            suscipit metus efficitur. Aliquam nisi est, iaculis sed cursus vitae, ornare
                                            dapibus purus. Integer quis dolor at felis sollicitudin egestas vel in
                                            metus. Integer sed ante tristique, laoreet arcu id, bibendum nulla.
                                            Pellentesque mattis, mi a mollis accumsan, purus nisl hendrerit dolor, in
                                            pharetra nibh lorem a sem. Praesent nisi turpis, condimentum mattis nulla
                                            ut, pellentesque fringilla arcu. Praesent scelerisque, nisl quis pulvinar
                                            mattis, augue augue vulputate mi, non mattis diam lacus id ipsum. Sed
                                            sollicitudin metus et felis vehicula, ac lobortis tortor scelerisque. In
                                            luctus ex consequat tellus sollicitudin convallis.
                                          </p>
                                        </Typography>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Flex justifyContent="flex-end">
                                          <Button
                                            color="primary"
                                            onClick={() =>
                                              createModal(
                                                <Modal<HTMLButtonElement>
                                                  focusable
                                                  ariaLabel="Hello world"
                                                  contextId="demo-small-modal"
                                                  onClose={(_event, contextId) => console.log(`closed ${contextId}`)}
                                                  size="small"
                                                >
                                                  {({ id, focusRef }) => (
                                                    <React.Fragment>
                                                      <ModalHeader modalId={id}>
                                                        <IconText
                                                          inline
                                                          icon={<HeartIcon scale="medium" />}
                                                          text={
                                                            <Rhythm ml={2}>
                                                              <Typography size="large">Hello world</Typography>
                                                            </Rhythm>
                                                          }
                                                        />
                                                      </ModalHeader>
                                                      <ModalBody scrollable style={{ paddingTop: 0 }}>
                                                        <Typography variants={['line-height-comfy']}>
                                                          <p>
                                                            This is a small modal with a custom header and no top margin
                                                            on the content. This does not use a render function so the
                                                            first element automatically gets focus.
                                                          </p>
                                                          <p>
                                                            From here you can{' '}
                                                            <Button
                                                              color="primary"
                                                              onClick={() => clearModals()}
                                                              ref={focusRef}
                                                              weight="inline"
                                                            >
                                                              clear all modals
                                                            </Button>{' '}
                                                            or clear one at a time with the close button.
                                                          </p>
                                                        </Typography>
                                                        <Rhythm my={3}>
                                                          <ButtonGroup
                                                            align="left"
                                                            display="block"
                                                            orientation="vertical"
                                                            spacing="comfy"
                                                          >
                                                            <Button
                                                              color="primary"
                                                              key="jump-large-modal"
                                                              onClick={() => jumpModal('demo-large-modal')}
                                                              weight="inline"
                                                            >
                                                              Jump to the large modal
                                                            </Button>
                                                            <Button
                                                              color="primary"
                                                              key="jump-medium-modal"
                                                              onClick={() => jumpModal('demo-medium-modal')}
                                                              weight="inline"
                                                            >
                                                              Jump to the medium modal
                                                            </Button>
                                                          </ButtonGroup>
                                                        </Rhythm>
                                                      </ModalBody>
                                                    </React.Fragment>
                                                  )}
                                                </Modal>,
                                              )
                                            }
                                            ref={focusRef}
                                            shape="brick"
                                            weight="shaded"
                                          >
                                            Open another modal
                                          </Button>
                                        </Flex>
                                      </ModalFooter>
                                    </React.Fragment>
                                  )}
                                </Modal>,
                              )
                            }
                            ref={focusRef}
                            shape="brick"
                            weight="shaded"
                          >
                            Open another modal
                          </Button>
                        </Flex>
                      </ModalFooter>
                    </React.Fragment>
                  )}
                </Modal>,
              )
            }
            shape="brick"
            weight="shaded"
          >
            Open a modal
          </Button>
          <Button
            color="primary"
            onClick={() =>
              createModal(
                <Modal<HTMLButtonElement>
                  focusable
                  permanent
                  contextId="demo-permanent-modal"
                  onClose={() => console.log('closed permanent')}
                  size="small"
                >
                  {({ id, focusRef }) => (
                    <React.Fragment>
                      <ModalHeader align="left" modalId={id} title="A permanent modal" />
                      <ModalBody>
                        <div>
                          This is a permanent modal that uses a render function to receive its parent&#39;s ID. It also
                          has a left-aligned header. Note that it does not have a close button. However you can still{' '}
                          <Button color="primary" onClick={() => clearModals()} weight="inline">
                            clear all modals
                          </Button>
                          .
                        </div>
                        <Rhythm my={3}>
                          <Button color="danger" onClick={() => popModal(true)} ref={focusRef} weight="inline">
                            Forceably remove
                          </Button>
                        </Rhythm>
                      </ModalBody>
                    </React.Fragment>
                  )}
                </Modal>,
              )
            }
            shape="brick"
            weight="shaded"
          >
            Open an uncloseable modal
          </Button>
          <Typography<'p'> as="p" color="primary">
            {hasModal('demo-large-modal') ? 'The large modal is open.' : 'The large modal is closed.'}
          </Typography>
          <Typography<'p'> as="p" color="primary">
            {hasModal('demo-medium-modal') ? 'The medium modal is open.' : 'The medium modal is closed.'}
          </Typography>
          <Typography<'p'> as="p" color="primary">
            {hasModal('demo-small-modal') ? 'The small modal is open.' : 'The small modal is closed.'}
          </Typography>
          <Typography<'p'> as="p" color="primary">
            {hasModal('demo-permanent-modal') ? 'The permanent modal is open.' : 'The permanent modal is closed.'}
          </Typography>
        </Rhythm>
      )}
    </ModalConsumer>
  </Modals>
);

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Modal.test.js', 'ModalContainer.test.js'],
};
*/

Default.parameters = {
  chromatic: { disableSnapshot: true },
};
