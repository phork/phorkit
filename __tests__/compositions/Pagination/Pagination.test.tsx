import { render } from '@testing-library/react';
import { Pagination } from 'lib';
import * as React from 'react';

describe('<Pagination />', () => {
  it('should render a basic pagination', () => {
    const { container } = render(
      <Pagination page={8} pageLinks={6} pageSize={10} totalItems={300} withPreviousAndNext />,
    );
    expect(container.querySelectorAll('svg').length).toBe(2);
    expect(container.querySelectorAll('button').length).toBe(11);
  });
});
