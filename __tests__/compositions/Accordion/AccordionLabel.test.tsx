import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { AccordionLabel } from 'lib';
import { render } from '../../utils';

describe('<AccordionLabel />', () => {
  it('should render an accordion label', () => {
    const { container, getByText } = render(<AccordionLabel id="test">Click me!</AccordionLabel>);
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
