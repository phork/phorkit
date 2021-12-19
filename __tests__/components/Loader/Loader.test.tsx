import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Loader } from 'lib';
import { render } from '../../utils';

describe('<Loader />', () => {
  it('should render a loader', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
    expect(container.querySelector('svg')).toHaveAttribute('width', '60px');
    expect(container.querySelector('svg')).toHaveAttribute('height', '60px');
  });

  it('should render a small scale loader', () => {
    const { container } = render(<Loader scale="small" />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '12px');
    expect(container.querySelector('svg')).toHaveAttribute('height', '12px');
  });

  it('should render a 16px loader', () => {
    const { container } = render(<Loader size={16} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '16px');
    expect(container.querySelector('svg')).toHaveAttribute('height', '16px');
  });

  it('should render a loader with a custom title', () => {
    const { getByTitle } = render(<Loader translations={{ loadingLabel: 'Custom label' }} />);
    expect(getByTitle('Custom label')).toBeTruthy();
  });

  it('should accept the rest of the props', () => {
    render(
      <Loader
        contrast
        unthemed
        className="loader"
        id="loader"
        position="fixed"
        style={{ color: 'red' }}
        themeId="dark"
        translations={{ loadingLabel: 'Test label' }}
      />,
    );

    const loader = document.getElementById('loader');
    expect(loader?.nodeName).toBe('DIV');
    expect(loader?.style.getPropertyValue('color')).toBe('red');
  });
});
