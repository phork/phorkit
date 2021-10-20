import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'lib';
import { fireEvent, render } from '../../utils';

describe('<Modal />', () => {
  it('should render a modal', () => {
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

  it('should render a modal with a close button', () => {
    const onClose = jest.fn();

    const { getByRole } = render(
      <Modal immediate contextId="modal" onClose={onClose}>
        <ModalHeader title="Modal header" />
        <ModalBody scrollable>Hello world</ModalBody>
        <ModalFooter>Modal footer</ModalFooter>
      </Modal>,
    );

    expect(onClose).not.toHaveBeenCalled();

    const button = getByRole('button');
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose.mock.calls[onClose.mock.calls.length - 1][1]).toBe('modal');
  });
});
