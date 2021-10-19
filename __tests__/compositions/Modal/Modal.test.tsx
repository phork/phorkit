import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'lib';
import { render } from '../../utils';

describe('<Modal />', () => {
  it('should render a basic modal', () => {
    const { getByText } = render(
      <Modal immediate ariaLabel="Example modal">
        <ModalBody key="content">Hello world</ModalBody>
      </Modal>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a modal with a header and footer', () => {
    const { getByText } = render(
      <Modal immediate>
        <ModalHeader title="Modal header" />
        <ModalBody scrollable>Hello world</ModalBody>
        <ModalFooter>Modal footer</ModalFooter>
      </Modal>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('Modal header')).toBeTruthy();
    expect(getByText('Modal footer')).toBeTruthy();
  });
});
