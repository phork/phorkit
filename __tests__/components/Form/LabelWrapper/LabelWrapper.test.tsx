import { render } from '@testing-library/react';
import React from 'react';
import { LabelWrapper } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';

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

  it('should render a label wrapper using a functional component', () => {
    const { container, getByText, getByRole } = render(
      <LabelWrapper<'a'> as={AsTypeA} label={<div>Hello world</div>} input={<input type="text" />} />,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByRole('textbox')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('A');
  });
});
