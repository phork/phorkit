import React from 'react';
import { LabelWrapper } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { render } from '../../../utils';

describe('<LabelWrapper />', () => {
  it('should render a label wrapper', () => {
    const { getByText, getByRole } = render(
      <LabelWrapper input={<input type="text" />} label={<div>Hello world</div>} />,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByRole('textbox')).toBeTruthy();
  });

  it('should render as a label', () => {
    const { container, getByText, getByRole } = render(
      <LabelWrapper<'label'> as="label" input={<input type="text" />} label={<div>Hello world</div>} />,
    );
    expect(container.firstChild?.nodeName).toBe('LABEL');
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByRole('textbox')).toBeTruthy();
  });

  it('should render using a functional component', () => {
    const { container, getByText, getByRole } = render(
      <LabelWrapper<'a'> as={AsTypeA} input={<input type="text" />} label={<div>Hello world</div>} />,
    );
    expect(getByText('Hello world')).toBeTruthy();
    expect(getByRole('textbox')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('A');
  });
});
