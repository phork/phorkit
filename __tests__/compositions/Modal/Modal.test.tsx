import { render } from '@testing-library/react';
import { Modal, ModalContent, ModalHeader, ModalFooter } from 'lib';
import * as React from 'react';

describe('<Modal />', () => {
  it('should render a basic modal', () => {
    const { getByText } = render(
      <Modal ariaLabel="Example modal" immediate>
        <ModalContent key="content">Hello world</ModalContent>
      </Modal>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a modal with a header and footer', () => {
    const { getByText } = render(
      <Modal immediate>
        <ModalHeader title="Modal header" />
        <ModalContent scrollable>Hello world</ModalContent>
        <ModalFooter>Modal footer</ModalFooter>
      </Modal>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('Modal header')).toBeTruthy();
    expect(getByText('Modal footer')).toBeTruthy();
  });
});
