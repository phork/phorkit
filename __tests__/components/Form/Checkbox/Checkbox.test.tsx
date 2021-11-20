import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Checkbox } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Checkbox />', () => {
  it('should render a labeled checkbox', () => {
    const { getByRole, getByLabelText } = render(<Checkbox onChange={() => {}}>Super fantastic label</Checkbox>);

    expect(getByRole('checkbox')).toBeTruthy();
    expect(getByLabelText('Super fantastic label')).toBeTruthy();
  });

  it('should render a checked checkbox', () => {
    const { getByRole } = render(
      <Checkbox checked onChange={() => {}}>
        Super fantastic label
      </Checkbox>,
    );
    expect(getByRole('checkbox')).toHaveAttribute('checked');
  });

  it('should render a disabled checkbox', () => {
    const { getByTestId } = render(
      <Checkbox disabled data-testid="checkbox" onChange={() => {}}>
        Super fantastic label
      </Checkbox>,
    );
    expect(getByTestId('checkbox')).toHaveAttribute('disabled');
  });

  it('should render a checkbox with a name', () => {
    const { getByRole } = render(
      <Checkbox name="checkboxTest" onChange={() => {}}>
        Super fantastic label
      </Checkbox>,
    );
    expect(getByRole('checkbox')).toHaveAttribute('name', 'checkboxTest');
  });

  it('should render a checkbox with a value', () => {
    const { getByRole } = render(
      <Checkbox onChange={() => {}} value="checkboxTest">
        Super fantastic label
      </Checkbox>,
    );
    expect(getByRole('checkbox')).toHaveAttribute('value', 'checkboxTest');
  });

  it('should be clickable to checked', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Checkbox onChange={onChange} value="yellow">
        Super fantastic label
      </Checkbox>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(true);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][2]).toBe('yellow');
  });

  it('should be clickable to unchecked', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Checkbox checked onChange={onChange} value="yellow">
        Super fantastic label
      </Checkbox>,
    );

    expect(onChange).not.toHaveBeenCalled();

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe(false);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][2]).toBe('yellow');
  });

  it('should convert numeric values to numbers', () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Checkbox data-type="number" onChange={onChange} value={8}>
        Super fantastic label
      </Checkbox>,
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange.mock.calls[onChange.mock.calls.length - 1][2]).toBe(8);
  });

  it('should focus the container on tab', () => {
    const { container, getByLabelText, getByRole } = render(
      <Checkbox onChange={() => {}}>Super fantastic label</Checkbox>,
    );

    const checkbox = getByRole('checkbox');
    const label = getByLabelText('Super fantastic label');

    container.focus();
    userEvent.tab();

    expect(label).toHaveFocus();
    expect(label).toHaveAttribute('tabIndex', '-1');

    userEvent.tab();

    expect(label).not.toHaveFocus();
    expect(checkbox).not.toHaveFocus();
  });

  it('should render the contrast colors', () => {
    const { getByLabelText } = render(
      <Checkbox contrast onChange={() => {}}>
        Super fantastic label
      </Checkbox>,
    );
    expect(getByLabelText('Super fantastic label')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    const { getByLabelText } = render(
      <Checkbox
        checked
        full
        indeterminate
        persistEvents
        reverse
        unthemed
        className="checkbox"
        id="checkbox"
        inputStyle={{ color: 'red' }}
        onChange={() => {}}
        size="large"
        style={{ color: 'red' }}
        themeId="dark"
        validity="danger"
        variant="primary"
      >
        Super fantastic label
      </Checkbox>,
    );
    expect(getByLabelText('Super fantastic label')).toBeTruthy();
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByTestId } = render(
      <Checkbox data-testid="checkbox" onChange={() => {}} ref={ref}>
        Super fantastic label
      </Checkbox>,
    );

    expect(getByTestId('checkbox')).toBe(ref.current);
  });
});
