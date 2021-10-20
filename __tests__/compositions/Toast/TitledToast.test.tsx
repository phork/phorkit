import React from 'react';
import { TitledToast } from 'lib';
import { render } from '../../utils';

describe('<TitledToast />', () => {
  it('should render a toast with a title', () => {
    const { getByText } = render(
      <TitledToast immediate level="success" title="Hello world">
        This is a success toast.
      </TitledToast>,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByText('This is a success toast.')).toBeTruthy();
  });
});
