import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Loader } from 'lib';

describe('<Loader />', () => {
  it('should render a basic loader', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a loader with a custom title', () => {
    const { getByTitle } = render(<Loader translations={{ loadingLabel: 'Custom label' }} />);
    expect(getByTitle('Custom label').parentElement).toHaveAttribute('width', '60px');
    expect(getByTitle('Custom label').parentElement).toHaveAttribute('height', '60px');
  });

  it('should render a small scale loader', () => {
    const { getByTitle } = render(<Loader scale="small" />);
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('width', '12px');
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('height', '12px');
  });

  it('should render a 16px loader', () => {
    const { getByTitle } = render(<Loader size={16} />);
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('width', '16px');
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('height', '16px');
  });
});
