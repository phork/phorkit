import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Select, NotifiedSelect } from 'lib';
import { render } from '../../../utils';

const options = [
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'violet', label: 'Violet' },
];

describe('<Select />', () => {
  it('should render a labeled select', () => {
    const { container, getByText, getByTitle } = render(
      <Select transitional label="Super fantastic label" onChange={() => {}} options={options} />,
    );

    expect(container.querySelector('select')).toBeTruthy();
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByTitle('Down arrow')).toBeTruthy();
  });

  it('should render a read only select', () => {
    const { container, getByText, getByTitle } = render(
      <Select readOnly label="Super fantastic label" onChange={() => {}} options={options} value="yellow" />,
    );

    expect(container.querySelector('select')).toBeFalsy();
    expect(getByText('Yellow')).toBeTruthy();
    expect(getByTitle('Read only')).toBeTruthy();
  });

  it('should render a selected select', () => {
    const { container } = render(
      <Select transitional label="Super fantastic label" onChange={() => {}} options={options} value="yellow" />,
    );

    expect(container.querySelector('select')).toHaveValue('yellow');
  });

  it('should render the placeholder optionLabel when focused', () => {
    const { container, getByText } = render(
      <Select
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        placeholder={{ label: 'Choose a color', optionLabel: '(None)' }}
        value="yellow"
      />,
    );

    container?.querySelector('label')?.focus();
    expect(getByText('(None)')).toBeTruthy();
  });

  it('should render a placeholder', () => {
    const { getByText } = render(
      <Select
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        placeholder={{ label: 'Choose a color' }}
      />,
    );

    expect(getByText('Choose a color')).toBeTruthy();
  });

  it('should render a read only placeholder', () => {
    const { getByText } = render(
      <Select
        readOnly
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        placeholder={{ label: 'Choose a color' }}
      />,
    );

    expect(getByText('Choose a color')).toBeTruthy();
  });

  it('should focus the select on tab', () => {
    const { container } = render(
      <Select transitional id="select" label="Super fantastic label" onChange={() => {}} options={options} />,
    );

    container.focus();
    userEvent.tab();

    const select = document.getElementById('select');
    expect(select).toHaveFocus();
  });

  it('should be selectable', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <Select data-testid="select" label="Super fantastic label" onChange={onChange} options={options} />,
    );

    expect(onChange).toHaveBeenCalledTimes(0);

    userEvent.selectOptions(getByTestId('select'), 'yellow');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('yellow');
  });

  it('should be reselectable', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <Select
        data-testid="select"
        label="Super fantastic label"
        onChange={onChange}
        options={options}
        value="yellow"
      />,
    );

    expect(onChange).toHaveBeenCalledTimes(0);

    // userEvent.deselectOptions only works with multi-selects
    userEvent.selectOptions(getByTestId('select'), 'red');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('red');
  });

  it('should render disabled options', () => {
    const { container } = render(
      <Select
        transitional
        label="Super fantastic label"
        onChange={() => {}}
        options={options.map(option => ({
          ...option,
          disabled: option.value === 'yellow',
        }))}
      />,
    );

    expect(container.querySelector('option[value="yellow"]')).toHaveAttribute('disabled');
  });

  it('should render the contrast colors', () => {
    const { getByText } = render(
      <Select contrast label="Super fantastic label" onChange={() => {}} options={options} />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
  });
});

describe('<Select multiple />', () => {
  it('should render a labeled multi-select', () => {
    const { container, getByText } = render(
      <Select
        multiple
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        values={['red', 'yellow']}
      />,
    );

    expect(container.querySelector('select')).toHaveAttribute('multiple');
    expect(getByText('Super fantastic label')).toBeTruthy();
  });

  it('should render a read only multi-select', () => {
    const { container, getByText } = render(
      <Select
        multiple
        readOnly
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        values={['red', 'yellow']}
      />,
    );

    expect(container.querySelector('select')).toBeFalsy();
    expect(getByText('Red')).toBeTruthy();
    expect(getByText('Yellow')).toBeTruthy();

    expect(() => getByText('Blue')).toThrow();
  });

  it('should render a selected multi-select', () => {
    const { container } = render(
      <Select
        multiple
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        values={['red', 'yellow']}
      />,
    );

    expect(container.querySelector('select')).toHaveValue(['red', 'yellow']);
  });

  it('should render a read only placeholder', () => {
    const { getByText } = render(
      <Select
        multiple
        readOnly
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        placeholder={{ label: 'Choose a color' }}
      />,
    );

    expect(getByText('Choose a color')).toBeTruthy();
  });

  it('should be selectable', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <Select multiple data-testid="select" label="Super fantastic label" onChange={onChange} options={options} />,
    );

    expect(onChange).toHaveBeenCalledTimes(0);

    // this fires the onChange once per selected option
    userEvent.selectOptions(getByTestId('select'), ['red', 'yellow']);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual(['red', 'yellow']);
  });

  it('should be deselectable', () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <Select
        multiple
        data-testid="select"
        label="Super fantastic label"
        onChange={onChange}
        options={options}
        values={['red', 'yellow', 'blue']}
      />,
    );

    expect(onChange).toHaveBeenCalledTimes(0);

    // this fires the onChange once per deselected option
    userEvent.deselectOptions(getByTestId('select'), ['blue']);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toEqual(['red', 'yellow']);
  });

  it('should accept a ref', () => {
    const ref = React.createRef<HTMLSelectElement>();
    const { getByTestId } = render(
      <Select
        transitional
        data-testid="select"
        label="Super fantastic label"
        onChange={() => {}}
        options={options}
        ref={ref}
      />,
    );

    expect(getByTestId('select')).toBe(ref.current);
  });
});

describe('<NotifiedSelect />', () => {
  it('should render a notified select', () => {
    const onChange = jest.fn();

    const { getByTestId, getByText } = render(
      <NotifiedSelect
        transitional
        data-testid="select"
        label="Super fantastic label"
        level="danger"
        notification="Example notification"
        onChange={onChange}
        options={options}
      />,
    );
    expect(getByText('Super fantastic label')).toBeTruthy();
    expect(getByText('Example notification')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    userEvent.selectOptions(getByTestId('select'), 'yellow');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][1]).toBe('yellow');
  });
});
