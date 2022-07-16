import { ArgsTable, Description, Primary, Stories, Subtitle, PRIMARY_STORY } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Typography } from 'components/Typography/Typography';
import { PageTitle } from 'stories/helpers/PageTitle';
import { Modal, ModalProps } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

export default {
  title: 'Surfaces/Modals/Modal',
  component: Modal,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },

    allowOverflow: {
      table: {
        category: 'Appearance',
      },
    },
    focusable: {
      table: {
        category: 'Appearance',
      },
    },
    immediate: {
      table: {
        category: 'Appearance',
      },
    },
    permanent: {
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Appearance',
      },
    },

    onClose: {
      table: {
        category: 'Actions',
      },
    },

    ariaLabel: {
      table: {
        category: 'Uncommon',
      },
    },
    className: {
      control: { disable: true },
      table: {
        category: 'Uncommon',
      },
    },
    contextId: {
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
      control: { disable: true },
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
          <PageTitle src="compositions/Modal" title="Modal" />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </React.Fragment>
      ),
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = args => <Modal {...args} />;

const defaultArgs = {
  allowOverflow: false,
  children: (
    <React.Fragment>
      <ModalHeader title="Hello world" />
      <ModalBody scrollable>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce blandit, mi id scelerisque semper, leo turpis
        varius tortor, a elementum libero nisl ut tortor. Quisque sit amet facilisis est, quis vestibulum eros. Donec
        orci dui, ultrices ac orci suscipit, tempus iaculis felis. Ut rutrum accumsan ligula, ac elementum ex mattis
        maximus. Ut at enim bibendum, imperdiet lectus sed, lacinia elit. Proin nec cursus metus. Maecenas sagittis
        interdum libero, sit amet mattis diam facilisis sed. Sed ut lacus ut libero hendrerit tincidunt.
      </ModalBody>
      <ModalFooter>
        <Typography align="right" as="div" size="xsmall" variants={['italic']} volume="quiet">
          To be continued ...
        </Typography>
      </ModalFooter>
    </React.Fragment>
  ),
  focusable: false,
  immediate: true,
  permanent: false,
  size: 'medium' as ModalProps['size'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/*
Default.parameters = {
  jest: ['Modal.test.js'],
};
*/

export const Basic = Template.bind({});
Basic.args = {
  ...defaultArgs,
  children: <ModalBody>This is an example modal.</ModalBody>,
};

export const SmallSize = Template.bind({});
SmallSize.storyName = 'Size: Small';
SmallSize.args = {
  ...defaultArgs,
  size: 'small',
};

export const MediumSize = Template.bind({});
MediumSize.storyName = 'Size: Medium';
MediumSize.args = {
  ...defaultArgs,
  size: 'medium',
};

export const LargeSize = Template.bind({});
LargeSize.storyName = 'Size: Large';
LargeSize.args = {
  ...defaultArgs,
  size: 'large',
};

export const XLargeSize = Template.bind({});
XLargeSize.storyName = 'Size: XLarge';
XLargeSize.args = {
  ...defaultArgs,
  size: 'xlarge',
};

export const Permanent = Template.bind({});
Permanent.args = {
  ...defaultArgs,
  permanent: true,
};

export const Bordered = Template.bind({});
Bordered.args = {
  ...defaultArgs,
  children: (
    <React.Fragment>
      <ModalHeader bordered align="left" modalId="modal-bordered" title="Hello world" />
      <ModalBody scrollable>
        <Typography variants={['line-height-comfy']}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nulla neque, tempus vitae mollis non,
            suscipit eget urna. Phasellus viverra sodales nibh, et tristique dui lacinia ac. In a erat elit. Morbi
            consequat quam non consequat ullamcorper. Suspendisse vel elementum lacus, id bibendum libero. Etiam sed
            mauris bibendum, tincidunt neque quis, fringilla lectus. Curabitur finibus enim a dolor suscipit, quis
            tristique ante facilisis. Sed arcu eros, sodales vel lectus aliquet, mollis porttitor dolor. Proin pharetra,
            ante eget malesuada consequat, sapien neque mattis elit, id mollis arcu enim id leo. Vivamus posuere porta
            dapibus. Aenean ultrices mollis eros id feugiat.
          </p>
          <p>
            Duis non magna et erat vestibulum posuere. In eu libero ultrices, dictum massa non, congue odio. Ut finibus
            facilisis lacinia. Nunc imperdiet pellentesque varius. Suspendisse interdum semper eros, id condimentum
            turpis dignissim vel. Cras mattis diam id lacinia mollis. Maecenas id placerat augue. Phasellus mattis diam
            in tellus rhoncus, ac suscipit turpis lobortis. Etiam et lobortis diam. Fusce odio risus, laoreet in feugiat
            vel, consequat nec purus. Donec vel commodo erat. Proin sit amet diam blandit, cursus velit in, commodo
            libero. Maecenas faucibus est eget lectus imperdiet fermentum. Proin in est aliquam, elementum dolor non,
            blandit leo. Cras eleifend placerat orci in maximus. Suspendisse tempus diam ligula, ac congue dolor lacinia
            a.
          </p>
        </Typography>
      </ModalBody>
      <ModalFooter bordered>
        <Typography align="right" as="div" size="xsmall" variants={['italic']} volume="quiet">
          To be continued ...
        </Typography>
      </ModalFooter>
    </React.Fragment>
  ),
  contextId: 'modal-bordered',
  style: {
    height: '400px',
  },
};

export const Overflow = Template.bind({});
Overflow.args = {
  ...defaultArgs,
  allowOverflow: true,
  children: (
    <ModalBody flush style={{ height: '300px' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#556270',
          borderRadius: '12px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-20px',
          top: '-20px',
          borderRadius: '100%',
          background: '#fff',
          boxShadow: '0 8px 40px 0 rgba(0, 0, 0, .1)',
          width: '280px',
          height: '280px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '150px',
          bottom: '-32px',
          borderRadius: '100%',
          background: '#fff',
          boxShadow: '0 8px 40px 0 rgba(0, 0, 0, .1)',
          width: '140px',
          height: '140px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '270px',
          bottom: '28px',
          borderRadius: '100%',
          background: '#fff',
          boxShadow: '0 8px 40px 0 rgba(0, 0, 0, .1)',
          width: '70px',
          height: '70px',
        }}
      />
    </ModalBody>
  ),
  permanent: true,
  style: {
    borderRadius: '12px',
    marginBottom: '24px',
    marginTop: '12px',
    maxWidth: 'calc(100% - 20px)',
  },
};
