import React from 'react';
import { Label } from 'lib';
import { AsTypeA } from '__mocks__/AsType.mock';
import { render } from '../../../utils';

describe('<Label />', () => {
  it('should render a label', () => {
    const { getByText } = render(<Label>Hello world</Label>);
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render as a div', () => {
    const { container } = render(<Label>Hello world</Label>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render as a label', () => {
    const { container } = render(<Label<'label'> as="label">Hello world</Label>);
    expect(container.firstChild?.nodeName).toBe('LABEL');
  });

  it('should render using a functional component', () => {
    const { container, getByText } = render(<Label<'a'> as={AsTypeA}>Hello world</Label>);
    expect(getByText('Hello world')).toBeTruthy();
    expect(container.firstChild?.nodeName).toBe('A');
  });
});
