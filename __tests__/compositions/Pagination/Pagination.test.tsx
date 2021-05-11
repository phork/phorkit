import { render } from '@testing-library/react';
import React from 'react';
import { Pagination } from 'lib';

describe('<Pagination />', () => {
  it('should render a basic pagination with previous and next buttons', () => {
    const { container, queryByText } = render(
      <Pagination
        activeProps={{ color: 'primary' }}
        inactiveProps={{ color: 'neutral' }}
        page={8}
        pageLinks={6}
        pageSize={10}
        totalItems={300}
        withPageLinks
        withPreviousAndNext
      />,
    );
    expect(queryByText('Previous page')).toBeTruthy();
    expect(queryByText('Next page')).toBeTruthy();
    expect(container.querySelectorAll('svg').length).toBe(0);
    expect(container.querySelectorAll('button').length).toBe(8);
  });

  it('should render a basic pagination with previous and next icons', () => {
    const { container } = render(
      <Pagination
        activeProps={{ color: 'primary' }}
        inactiveProps={{ color: 'neutral' }}
        page={8}
        pageLinks={6}
        pageSize={10}
        totalItems={300}
        withIcons
        withPageLinks
        withPreviousAndNext
      />,
    );
    expect(container.querySelectorAll('svg').length).toBe(2);
    expect(container.querySelectorAll('button').length).toBe(8);
  });

  it('should render a basic pagination with first and last buttons', () => {
    const { container, queryByText } = render(
      <Pagination
        activeProps={{ color: 'primary' }}
        inactiveProps={{ color: 'neutral' }}
        page={8}
        pageLinks={6}
        pageSize={10}
        totalItems={300}
        withFirstAndLast
        withPageLinks
      />,
    );
    expect(queryByText('First page')).toBeTruthy();
    expect(queryByText('Last page')).toBeTruthy();
    expect(container.querySelectorAll('svg').length).toBe(0);
    expect(container.querySelectorAll('button').length).toBe(8);
  });
});
