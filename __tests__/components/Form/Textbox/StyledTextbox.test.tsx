import React from 'react';
import { StyledTextbox, NotifiedStyledTextbox } from 'lib';
import { fireEvent, render } from '../../../utils';

const styles = {
  textboxIconColor: '#9D69D5',
  textboxIconHoveredColor: '#642da0',
  textboxInputContainerBackgroundColor: 'transparent',
  textboxInputContainerBorderColor: '#9D69D5',
  textboxInputContainerFocusedBorderColor: '#57278C',
  textboxInputContainerHoveredBorderColor: '#642da0',
  textboxInputTextColor: '#642da0',
  textboxLabelTextColor: '#B995E1',
};

describe('<StyledTextbox />', () => {
  it('should render a labeled textbox', () => {
    const { getByText } = render(<StyledTextbox label="Super fantastic label" onChange={() => {}} {...styles} />);
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should trigger the change event', () => {
    const onChange = jest.fn();
    const { container } = render(<StyledTextbox label="Super fantastic label" onChange={onChange} {...styles} />);
    expect(onChange).not.toHaveBeenCalled();

    const textbox = container.querySelector('input');
    textbox && fireEvent.change(textbox, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });
});

describe('<NotifiedStyledTextbox />', () => {
  it('should render a notified textbox', () => {
    const onChange = jest.fn();

    const { container, getByText } = render(
      <NotifiedStyledTextbox
        label="Super fantastic label"
        level="danger"
        notification="Example notification"
        onChange={onChange}
        {...styles}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const textbox = container.querySelector('input');
    textbox && fireEvent.change(textbox, { target: { value: 'Hello world' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('Hello world');
  });
});
