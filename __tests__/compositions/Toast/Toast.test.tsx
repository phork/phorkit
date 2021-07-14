import { render } from '@testing-library/react';
import React from 'react';
import { Toast } from 'lib';

describe('<Toast />', () => {
  it('should render a basic toast with a title', () => {
    const { getByText } = render(
      <Toast immediate level="success" title="Hello world">
        This is a success toast.
      </Toast>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('This is a success toast.')).toBeTruthy();
  });
});
