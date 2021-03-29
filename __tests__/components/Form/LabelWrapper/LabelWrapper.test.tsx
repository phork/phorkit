import { render } from '@testing-library/react';
import { LabelWrapper } from 'lib';
import * as React from 'react';

describe('<LabelWrapper />', () => {
  it('should render a basic label wrapper', () => {
    const { getByText, getByRole } = render(
      <LabelWrapper label={<div>Hello world</div>} input={<input type="text" />} />,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByRole('textbox')).toBeTruthy();
  });

  it('should render a label wrapper as a label', () => {
    const { container, getByText, getByRole } = render(
      <LabelWrapper<'label'> as="label" label={<div>Hello world</div>} input={<input type="text" />} />,
    );
    expect(container.firstChild?.nodeName).toBe('LABEL');
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByRole('textbox')).toBeTruthy();
  });
});
