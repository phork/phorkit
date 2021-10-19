import React from 'react';
import { Toast } from 'lib';
import { render } from '../../utils';

describe('<Toast />', () => {
  it('should render a basic toast', () => {
    const { getByText } = render(
      <Toast immediate level="success">
        This is a success toast.
      </Toast>,
    );
    expect(getByText('This is a success toast.')).toBeTruthy();
  });
});
