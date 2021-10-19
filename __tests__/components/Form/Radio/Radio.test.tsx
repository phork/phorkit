import React from 'react';
import { Radio } from 'lib';
import { fireEvent, render } from '../../../utils';

describe('<Radio />', () => {
  it('should render a labeled radio', () => {
    const onChange = jest.fn();

    const { getByRole, getByLabelText } = render(<Radio onChange={onChange}>Super fantastic label</Radio>);
    expect(getByLabelText('Super fantastic label')).toBeTruthy();

    expect(onChange).not.toHaveBeenCalled();

    const radio = getByRole('radio');
    fireEvent.click(radio);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
