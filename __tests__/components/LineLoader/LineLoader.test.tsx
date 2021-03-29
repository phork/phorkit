import { render } from '@testing-library/react';
import { LineLoader } from 'lib';
import * as React from 'react';

describe('<LineLoader />', () => {
  it('should render a basic line loader', () => {
    const { container } = render(<LineLoader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
