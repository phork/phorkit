import { render } from '@testing-library/react';
import * as React from 'react';
import { LineLoader } from 'lib';

describe('<LineLoader />', () => {
  it('should render a basic line loader', () => {
    const { container } = render(<LineLoader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
