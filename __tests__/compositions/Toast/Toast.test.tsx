import { render } from '@testing-library/react';
import * as React from 'react';
import { Toast } from 'lib';

describe('<Toast />', () => {
  it('should render a basic toast with a title', () => {
    const { getByText } = render(
      <Toast title="Hello world" level="success" immediate>
        This is a success toast.
      </Toast>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('This is a success toast.')).toBeTruthy();
  });
});
