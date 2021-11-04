import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { StyledLoader } from 'lib';
import { render } from '../../utils';

const styles = {
  color: '#556270',
};

describe('<StyledLoader />', () => {
  it('should render a loader', () => {
    const { container } = render(<StyledLoader {...styles} />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('should render a loader with a custom title', () => {
    const { getByTitle } = render(<StyledLoader translations={{ loadingLabel: 'Custom label' }} {...styles} />);
    expect(getByTitle('Custom label').parentElement).toHaveAttribute('width', '60px');
    expect(getByTitle('Custom label').parentElement).toHaveAttribute('height', '60px');
  });

  it('should render a small scale loader', () => {
    const { getByTitle } = render(<StyledLoader scale="small" {...styles} />);
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('width', '12px');
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('height', '12px');
  });

  it('should render a 16px loader', () => {
    const { getByTitle } = render(<StyledLoader size={16} {...styles} />);
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('width', '16px');
    expect(getByTitle('Loading...').parentElement).toHaveAttribute('height', '16px');
  });
});
