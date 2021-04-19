import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import * as React from 'react';
import { AccordionLabel } from 'lib';

describe('<AccordionLabel />', () => {
  it('should render a basic accordion label', () => {
    const { container, getByText } = render(<AccordionLabel id="test">Click me!</AccordionLabel>);
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(getByText('Click me!')).toBeTruthy();
  });
});
