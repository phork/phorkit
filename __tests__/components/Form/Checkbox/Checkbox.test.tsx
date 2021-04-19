import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Checkbox } from 'lib';

describe('<Checkbox />', () => {
  it('should render a labeled checkbox', () => {
    const onChange = jest.fn();

    const { getByRole, getByLabelText } = render(<Checkbox onChange={onChange}>Super fantastic label</Checkbox>);
    expect(getByLabelText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
