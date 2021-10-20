import React from 'react';
import { Pagination } from 'lib';
import { render } from '../../utils';

describe('<Pagination />', () => {
  it('should render pagination with previous and next buttons', () => {
    const { container, queryByText } = render(
      <Pagination
        withPageLinks
        withPreviousAndNext
        activePageProps={{ color: 'primary' }}
        page={8}
        pageLinks={6}
        pageProps={{ color: 'neutral' }}
        pageSize={10}
        totalItems={300}
      />,
    );
    expect(queryByText('Previous page')).toBeTruthy();
    expect(queryByText('Next page')).toBeTruthy();
    expect(container.querySelectorAll('svg').length).toBe(0);
    expect(container.querySelectorAll('button').length).toBe(8);
  });

  it('should render pagination with previous and next icons', () => {
    const { container } = render(
      <Pagination
        withIcons
        withPageLinks
        withPreviousAndNext
        activePageProps={{ color: 'primary' }}
        page={8}
        pageLinks={6}
        pageProps={{ color: 'neutral' }}
        pageSize={10}
        totalItems={300}
      />,
    );
    expect(container.querySelectorAll('svg').length).toBe(2);
    expect(container.querySelectorAll('button').length).toBe(8);
  });

  it('should render pagination with first and last buttons', () => {
    const { container, queryByText } = render(
      <Pagination
        withFirstAndLast
        withPageLinks
        activePageProps={{ color: 'primary' }}
        page={8}
        pageLinks={6}
        pageProps={{ color: 'neutral' }}
        pageSize={10}
        totalItems={300}
      />,
    );
    expect(queryByText('First page')).toBeTruthy();
    expect(queryByText('Last page')).toBeTruthy();
    expect(container.querySelectorAll('svg').length).toBe(0);
    expect(container.querySelectorAll('button').length).toBe(8);
  });
});
