import React from 'react';
import { DropoverInputLabel } from 'lib';
import { render } from '../../utils';

describe('<DropoverInputLabel />', () => {
  it('should render a label', () => {
    const { getByText } = render(
      <DropoverInputLabel>
        <div>Hello world</div>
      </DropoverInputLabel>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render a cloned label', () => {
    const { getByText } = render(
      <DropoverInputLabel cloned>
        <div>Hello world</div>
      </DropoverInputLabel>,
    );
    expect(getByText('Hello world')).toBeTruthy();
  });
});
